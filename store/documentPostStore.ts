import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { create } from "zustand";
// export interface DocumentPostDto {
//   documentPost?: DocumentPost;
//   documentPostsPage?: Page<DocumentPost>;
//   hotDocuments?: DocumentPost[];
// }
type DocumentPostState = {
  dailyDocuments: DocumentPost[] | null;
  weeklyDocuments: DocumentPost[] | null;
  filteredDocuments: DocumentPost[] | null;
  activeTab: "daily" | "weekly";
};

type DocumentPostActions = {
  setDailyDocuments: (documents: DocumentPost[]) => void;
  setWeeklyDocuments: (documents: DocumentPost[]) => void;
  setFilteredDocuments: (documents: DocumentPost[]) => void;
  setActiveTab: (tab: "daily" | "weekly") => void;
  reset: () => void;
};

const initialState: DocumentPostState = {
  dailyDocuments: null,
  weeklyDocuments: null,
  filteredDocuments: null,
  activeTab: "daily",
};

export const useDocumentPostStore = create<
  DocumentPostState & DocumentPostActions
>((set) => ({
  ...initialState,

  setDailyDocuments: (dailyDocuments) => set({ dailyDocuments }),

  setWeeklyDocuments: (weeklyDocuments) => set({ weeklyDocuments }),

  setFilteredDocuments: (filteredDocuments) => set({ filteredDocuments }),

  setActiveTab: (activeTab) => set({ activeTab }),

  reset: () => set(initialState),
}));
