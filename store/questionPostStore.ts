import { QuestionPost } from "@/types/entities/postgres/questionPost";
import { create } from "zustand";

type QuestionPostState = {
  dailyQuestions: QuestionPost[] | null;
  weeklyQuestions: QuestionPost[] | null;
  filteredQuestions: QuestionPost[] | null;
  activeTab: "daily" | "weekly";
};

type QuestionPostActions = {
  setDailyQuestions: (questions: QuestionPost[]) => void;
  setWeeklyQuestions: (questions: QuestionPost[]) => void;
  setFilteredQuestions: (questions: QuestionPost[]) => void;
  setActiveTab: (tab: "daily" | "weekly") => void;
  reset: () => void;
};

const initialState: QuestionPostState = {
  dailyQuestions: null,
  weeklyQuestions: null,
  filteredQuestions: null,
  activeTab: "daily",
};

export const useQuestionPostStore = create<
  QuestionPostState & QuestionPostActions
>((set) => ({
  ...initialState,

  setDailyQuestions: (dailyQuestions) => set({ dailyQuestions }),

  setWeeklyQuestions: (weeklyQuestions) => set({ weeklyQuestions }),

  setFilteredQuestions: (filteredQuestions) => set({ filteredQuestions }),

  setActiveTab: (activeTab) => set({ activeTab }),

  reset: () => set(initialState),
}));
