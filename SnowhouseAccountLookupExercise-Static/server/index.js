import express from 'express';
import cors from 'cors';
import snowflake from 'snowflake-sdk';
import fs from 'fs';
import path from 'path';
import os from 'os';

// ---------------------------------------------------------------------------
// TOML parser – minimal, only handles the [snowhouse_tam] section
// ---------------------------------------------------------------------------
function parseConnectionsToml() {
  const tomlPath = path.join(os.homedir(), '.snowflake', 'connections.toml');
  const content = fs.readFileSync(tomlPath, 'utf-8');
  const lines = content.split('\n');

  let inSection = false;
  const config = {};

  for (const raw of lines) {
    const line = raw.trim();

    if (line === '[snowhouse_tam]') {
      inSection = true;
      continue;
    }

    // Another section header → stop collecting
    if (inSection && line.startsWith('[')) {
      break;
    }

    if (inSection && line && !line.startsWith('#')) {
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;

      const key = line.slice(0, eqIdx).trim();
      let value = line.slice(eqIdx + 1).trim();

      // Strip surrounding quotes (single or double)
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      config[key] = value;
    }
  }

  return config;
}

// ---------------------------------------------------------------------------
// Allowed queries (whitelist)
// ---------------------------------------------------------------------------
const ALLOWED_QUERIES = {
  'connection-check': "SELECT CURRENT_ROLE() AS CURRENT_ROLE",
  'dropbox-search': `SELECT SNOWFLAKE_ACCOUNT_ID, SNOWFLAKE_DEPLOYMENT, *
FROM FINANCE.CUSTOMER.SALESFORCE_SNOWFLAKE_MAPPING
WHERE 1=1
  AND (SALESFORCE_ACCOUNT_NAME ILIKE '%Dropbox%'
       OR SNOWFLAKE_ACCOUNT_NAME ILIKE '%Dropbox%')
ORDER BY SNOWFLAKE_ACCOUNT_NAME`,
  'dropbox-refined': `SELECT SNOWFLAKE_ACCOUNT_ID, SNOWFLAKE_DEPLOYMENT, *
FROM FINANCE.CUSTOMER.SALESFORCE_SNOWFLAKE_MAPPING
WHERE 1=1
  AND (SALESFORCE_ACCOUNT_NAME ILIKE '%Dropbox%'
       OR SNOWFLAKE_ACCOUNT_NAME ILIKE '%Dropbox%')
  AND ORGANIZATION_NAME IS NOT NULL
ORDER BY SNOWFLAKE_ACCOUNT_NAME`
};

// ---------------------------------------------------------------------------
// Snowflake connection setup
// ---------------------------------------------------------------------------
let sfConnection = null;
let isConnected = false;

function initSnowflake() {
  const config = parseConnectionsToml();
  console.log('[snowflake] Parsed connection config for snowhouse_tam');

  sfConnection = snowflake.createConnection({
    account: config.account,
    username: config.user,
    authenticator: 'EXTERNALBROWSER',
    role: 'TECHNICAL_ACCOUNT_MANAGER',
    warehouse: config.warehouse,
    database: config.database,
    schema: config.schema
  });

  return new Promise((resolve, reject) => {
    sfConnection.connectAsync((err, conn) => {
      if (err) {
        console.error('[snowflake] Connection failed:', err.message);
        reject(err);
      } else {
        isConnected = true;
        console.log('[snowflake] Connected successfully as', conn.getId());
        resolve(conn);
      }
    });
  });
}

function executeQuery(sql) {
  return new Promise((resolve, reject) => {
    sfConnection.execute({
      sqlText: sql,
      complete: (err, stmt, rows) => {
        if (err) {
          reject(err);
        } else {
          const columns = stmt.getColumns().map((col) => col.getName());
          const rowArrays = rows.map((row) =>
            columns.map((col) => row[col])
          );
          resolve({ columns, rows: rowArrays });
        }
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------
const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', connected: isConnected });
});

// Connect / reconnect to Snowflake (triggers EXTERNALBROWSER auth)
app.post('/api/connect', async (_req, res) => {
  try {
    if (isConnected) {
      // Verify the connection is still alive
      try {
        await executeQuery('SELECT 1');
        return res.json({ status: 'already_connected' });
      } catch {
        console.warn('[snowflake] Connection stale – reconnecting...');
        isConnected = false;
      }
    }
    console.log('[snowflake] Re-initiating connection (browser auth)...');
    await initSnowflake();
    res.json({ status: 'connected' });
  } catch (err) {
    console.error('[snowflake] Reconnect failed:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Query endpoint
app.post('/api/query', async (req, res) => {
  const { queryId } = req.body;

  if (!queryId || !ALLOWED_QUERIES[queryId]) {
    return res.status(400).json({
      error: `Invalid queryId. Allowed values: ${Object.keys(ALLOWED_QUERIES).join(', ')}`
    });
  }

  if (!isConnected) {
    return res.status(500).json({ error: 'Snowflake is not connected' });
  }

  const sql = ALLOWED_QUERIES[queryId];

  try {
    console.log(`[query] Executing "${queryId}"`);
    const result = await executeQuery(sql);
    console.log(`[query] "${queryId}" returned ${result.rows.length} rows`);
    res.json(result);
  } catch (err) {
    // Auto-reconnect on terminated connection, then retry once
    if (err.message && err.message.includes('terminated connection')) {
      console.warn(`[query] "${queryId}" hit terminated connection – reconnecting...`);
      try {
        isConnected = false;
        await initSnowflake();
        console.log(`[query] Reconnected – retrying "${queryId}"`);
        const result = await executeQuery(sql);
        console.log(`[query] "${queryId}" returned ${result.rows.length} rows (after reconnect)`);
        res.json(result);
      } catch (retryErr) {
        console.error(`[query] "${queryId}" failed after reconnect:`, retryErr.message);
        res.status(500).json({ error: retryErr.message });
      }
    } else {
      console.error(`[query] "${queryId}" failed:`, err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
async function start() {
  try {
    await initSnowflake();
  } catch {
    console.warn('[server] Starting without Snowflake connection – health will report connected: false');
  }

  app.listen(PORT, () => {
    console.log(`[server] Listening on http://localhost:${PORT}`);
  });
}

start();
