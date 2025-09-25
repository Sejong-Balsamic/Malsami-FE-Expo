import { QuestionPost } from "@/types/entities/postgres/questionPost";
import { create } from "zustand";

type QuestionPostState = {
  dailyQuestions: QuestionPost[] | null;
  weeklyQuestions: QuestionPost[] | null;
  filteredQuestions: QuestionPost[] | null;
  activeTab: "daily" | "weekly";
  lastFetchTime: {
    dailyQuestions: number | null;
    weeklyQuestions: number | null;
    filteredQuestions: number | null;
  };
};

type QuestionPostActions = {
  setDailyQuestions: (questions: QuestionPost[]) => void;
  setWeeklyQuestions: (questions: QuestionPost[]) => void;
  setFilteredQuestions: (questions: QuestionPost[]) => void;
  setActiveTab: (tab: "daily" | "weekly") => void;
  reset: () => void;

  updateLastFetchTime: (type: keyof QuestionPostState["lastFetchTime"]) => void;

  isCacheValid: (type: keyof QuestionPostState["lastFetchTime"]) => boolean;
};

const initialState: QuestionPostState = {
  dailyQuestions: null,
  weeklyQuestions: null,
  filteredQuestions: null,
  activeTab: "daily",
  lastFetchTime: {
    dailyQuestions: null,
    weeklyQuestions: null,
    filteredQuestions: null,
  },
};

export const useQuestionPostStore = create<
  QuestionPostState & QuestionPostActions
>((set, get) => ({
  ...initialState,

  setDailyQuestions: (dailyQuestions) => {
    set({ dailyQuestions });
    get().updateLastFetchTime("dailyQuestions");
  },

  setWeeklyQuestions: (weeklyQuestions) => {
    set({ weeklyQuestions });
    get().updateLastFetchTime("weeklyQuestions");
  },

  setFilteredQuestions: (filteredQuestions) => {
    set({ filteredQuestions });
    get().updateLastFetchTime("filteredQuestions");
  },

  setActiveTab: (activeTab) => set({ activeTab }),

  updateLastFetchTime: (type) => {
    set((state) => ({
      lastFetchTime: {
        ...state.lastFetchTime,
        [type]: Date.now(),
      },
    }));
  },

  isCacheValid: (type) => {
    const state = get();
    const lastFetch = state.lastFetchTime[type];
    if (!lastFetch) return false;

    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5분
    return now - lastFetch < fiveMinutes;
  },

  reset: () => set(initialState),
}));
