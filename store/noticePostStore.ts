import { NoticePostDto } from "@/types/responses/noticePostDto";
import { NoticePost } from "@/types/entities/postgres/noticePost";
import { Page } from "@/types/entities/interface/page";
import { create } from "zustand";

type NoticePostState = {
  noticePost: NoticePost | null;
  noticePostsPage: Page<NoticePost> | null;
  isLoading: boolean;
  error: Error | null;
};

type NoticePostActions = {
  setNoticePost: (noticePost: NoticePost | null) => void;
  setNoticePostsPage: (noticePostsPage: Page<NoticePost> | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  updateFromDto: (dto: NoticePostDto) => void;
  reset: () => void;
};

const initialState: NoticePostState = {
  noticePost: null,
  noticePostsPage: null,
  isLoading: false,
  error: null,
};

export const useNoticePostStore = create<NoticePostState & NoticePostActions>(
  (set) => ({
    ...initialState,

    setNoticePost: (noticePost) => set({ noticePost }),

    setNoticePostsPage: (noticePostsPage) => set({ noticePostsPage }),

    setIsLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    updateFromDto: (dto) =>
      set((state) => ({
        noticePost: dto.noticePost || state.noticePost,
        noticePostsPage: dto.noticePostsPage || state.noticePostsPage,
        error: null,
      })),

    reset: () => set(initialState),
  })
);
