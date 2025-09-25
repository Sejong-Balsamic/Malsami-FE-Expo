import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { create } from "zustand";

type DocumentPostState = {
  dailyDocuments: DocumentPost[] | null;
  weeklyDocuments: DocumentPost[] | null;
  filteredDocuments: DocumentPost[] | null;
  activeTab: "daily" | "weekly";

  // 캐시 상태 추적
  lastFetchTime: {
    dailyDocuments: number | null;
    weeklyDocuments: number | null;
    filteredDocuments: number | null;
  };
};

type DocumentPostActions = {
  setDailyDocuments: (documents: DocumentPost[]) => void;
  setWeeklyDocuments: (documents: DocumentPost[]) => void;
  setFilteredDocuments: (documents: DocumentPost[]) => void;
  setActiveTab: (tab: "daily" | "weekly") => void;
  reset: () => void;

  // 캐시 시간 업데이트
  updateLastFetchTime: (type: keyof DocumentPostState["lastFetchTime"]) => void;

  // 캐시 유효성 검사 (5분 기준)
  isCacheValid: (type: keyof DocumentPostState["lastFetchTime"]) => boolean;
};

const initialState: DocumentPostState = {
  dailyDocuments: null,
  weeklyDocuments: null,
  filteredDocuments: null,
  activeTab: "daily",
  lastFetchTime: {
    dailyDocuments: null,
    weeklyDocuments: null,
    filteredDocuments: null,
  },
};

export const useDocumentPostStore = create<
  DocumentPostState & DocumentPostActions
>((set, get) => ({
  ...initialState,

  setDailyDocuments: (dailyDocuments) => {
    set({ dailyDocuments });
    get().updateLastFetchTime("dailyDocuments");
  },

  setWeeklyDocuments: (weeklyDocuments) => {
    set({ weeklyDocuments });
    get().updateLastFetchTime("weeklyDocuments");
  },

  setFilteredDocuments: (filteredDocuments) => {
    set({ filteredDocuments });
    get().updateLastFetchTime("filteredDocuments");
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
