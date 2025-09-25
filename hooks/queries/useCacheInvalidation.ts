import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { useCallback } from "react";

export function useCacheInvalidation() {
  const queryClient = useQueryClient();
  const invalidateDocuments = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.GET_POST, queryKeys.GET_DOCUMENT],
    });
  }, [queryClient]);
  const invalidateDailyDocuments = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_DOCUMENT,
        queryKeys.GET_DAILY_DOCUMENTS,
      ],
    });
  }, [queryClient]);

  const invalidateWeeklyDocuments = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_DOCUMENT,
        queryKeys.GET_WEEKLY_DOCUMENTS,
      ],
    });
  }, [queryClient]);

  const invalidateNotices = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_NOTICE,
        queryKeys.GET_NOTICE_POSTS,
      ],
    });
  }, [queryClient]);

  const invalidateQuestions = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.GET_POST, queryKeys.GET_QUESTION],
    });
  }, [queryClient]);

  const invalidateDailyQuestions = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_QUESTION,
        queryKeys.GET_DAILY_QUESTIONS,
      ],
    });
  }, [queryClient]);

  const invalidateWeeklyQuestions = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_QUESTION,
        queryKeys.GET_WEEKLY_QUESTIONS,
      ],
    });
  }, [queryClient]);

  const invalidateFilteredQuestions = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_QUESTION,
        queryKeys.GET_FILTERED_QUESTIONS,
      ],
    });
  }, [queryClient]);

  const invalidateHomeData = useCallback(async () => {
    await Promise.all([
      invalidateDocuments(),
      invalidateNotices(),
      invalidateQuestions(),
    ]);
  }, [invalidateDocuments, invalidateNotices, invalidateQuestions]);

  const forceRefetch = useCallback(
    async (queryKey: string[]) => {
      await queryClient.refetchQueries({
        queryKey,
      });
    },
    [queryClient]
  );

  return {
    invalidateDocuments,
    invalidateDailyDocuments,
    invalidateWeeklyDocuments,
    invalidateNotices,
    invalidateQuestions,
    invalidateDailyQuestions,
    invalidateWeeklyQuestions,
    invalidateFilteredQuestions,
    invalidateHomeData,
    forceRefetch,
  };
}
