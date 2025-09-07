"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { createQuizStoreConstructor, QuizStore } from "./quiz-store";

type QuizStoreApi = ReturnType<ReturnType<typeof createQuizStoreConstructor>>;

const QuizStoreContext = createContext<QuizStoreApi | undefined>(undefined);

export const QuizStoreProvider = ({
  create,
  children,
}: {
  create: ReturnType<typeof createQuizStoreConstructor>;
  children: ReactNode;
}) => {
  const storeRef = useRef<QuizStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = create();

  return (
    <QuizStoreContext.Provider value={storeRef.current}>
      {children}
    </QuizStoreContext.Provider>
  );
};

export const useQuizStore = <T,>(selector: (store: QuizStore) => T): T => {
  const quizStoreContext = useContext(QuizStoreContext);

  if (!quizStoreContext) {
    throw new Error(`useQuizStore must be used within QuizStoreProvider`);
  }

  return useStore(quizStoreContext, useShallow(selector));
};
