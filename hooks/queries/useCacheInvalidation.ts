import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { useCallback } from "react";

//  * 캐시 무효화 및 데이터 갱신을 관리하는 훅
//  * mutation 후 특정 데이터를 무효화하여 최신 데이터로 갱신
export function useCacheInvalidation() {
  const queryClient = useQueryClient();

  // 문서 관련 캐시 무효화
  const invalidateDocuments = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.GET_POST, queryKeys.GET_DOCUMENT],
    });
  }, [queryClient]);

  // 일일 문서 캐시 무효화
  const invalidateDailyDocuments = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_DOCUMENT,
        queryKeys.GET_DAILY_DOCUMENTS,
      ],
    });
  }, [queryClient]);

  // 주간 문서 캐시 무효화
  const invalidateWeeklyDocuments = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_DOCUMENT,
        queryKeys.GET_WEEKLY_DOCUMENTS,
      ],
    });
  }, [queryClient]);

  // 공지사항 캐시 무효화
  const invalidateNotices = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.GET_POST,
        queryKeys.GET_NOTICE,
        queryKeys.GET_NOTICE_POSTS,
      ],
    });
  }, [queryClient]);

  // 질문 관련 캐시 무효화
  const invalidateQuestions = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.GET_POST, queryKeys.GET_QUESTION],
    });
  }, [queryClient]);

  // 모든 홈 화면 관련 캐시 무효화
  const invalidateHomeData = useCallback(async () => {
    await Promise.all([
      invalidateDocuments(),
      invalidateNotices(),
      invalidateQuestions(),
    ]);
  }, [invalidateDocuments, invalidateNotices, invalidateQuestions]);

  //특정 쿼리 키의 데이터를 강제로 새로고침
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

    invalidateHomeData,

    forceRefetch,
  };
}
