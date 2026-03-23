import { createContext, useContext, useState, type ReactNode } from "react";

export const TOTAL_PAGES = 8;

interface ExerciseContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  completedPages: Set<number>;
  markPageCompleted: (page: number) => void;

  queryResults: Record<string, any[]>;
  setQueryResults: (key: string, data: any[]) => void;

  answers: Record<string, string>;
  setAnswer: (id: string, value: string) => void;
  completedChecks: Set<string>;
  markCheckCompleted: (id: string) => void;

  checklist: Record<string, boolean>;
  toggleChecklistItem: (id: string) => void;
}

export const ExerciseContext = createContext<ExerciseContextType | null>(null);

export function ExerciseProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [completedPages, setCompletedPages] = useState<Set<number>>(new Set());
  const [queryResults, setQueryResultsState] = useState<Record<string, any[]>>({});
  const [answers, setAnswersState] = useState<Record<string, string>>({});
  const [completedChecks, setCompletedChecks] = useState<Set<string>>(new Set());
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  function markPageCompleted(page: number) {
    setCompletedPages((prev) => new Set(prev).add(page));
  }

  function setQueryResults(key: string, data: any[]) {
    setQueryResultsState((prev) => ({ ...prev, [key]: data }));
  }

  function setAnswer(id: string, value: string) {
    setAnswersState((prev) => ({ ...prev, [id]: value }));
  }

  function markCheckCompleted(id: string) {
    setCompletedChecks((prev) => new Set(prev).add(id));
  }

  function toggleChecklistItem(id: string) {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <ExerciseContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        completedPages,
        markPageCompleted,
        queryResults,
        setQueryResults,
        answers,
        setAnswer,
        completedChecks,
        markCheckCompleted,
        checklist,
        toggleChecklistItem,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercise(): ExerciseContextType {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercise must be used within an ExerciseProvider");
  }
  return context;
}
