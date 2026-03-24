import { ExerciseProvider, useExercise } from './context/ExerciseContext';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Page1_Objective from './pages/Page1_Objective';
import Page2_Scenario from './pages/Page2_Scenario';
import Page3_Step1 from './pages/Page3_Step1';
import Page4_Step2 from './pages/Page4_Step2';
import Page5_Step3 from './pages/Page5_Step3';
import Page6_Step4 from './pages/Page6_Step4';
import Page7_Step5 from './pages/Page7_Step5';
import Page8_Summary from './pages/Page8_Summary';
import './styles/global.css';

const pages: Record<number, React.FC> = {
  1: Page1_Objective,
  2: Page2_Scenario,
  3: Page3_Step1,
  4: Page4_Step2,
  5: Page5_Step3,
  6: Page6_Step4,
  7: Page7_Step5,
  8: Page8_Summary,
};

function AppContent() {
  const { currentPage } = useExercise();
  const PageComponent = pages[currentPage] || Page1_Objective;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <TopBar />
        <div className="main-content">
          <PageComponent />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ExerciseProvider>
      <AppContent />
    </ExerciseProvider>
  );
}
