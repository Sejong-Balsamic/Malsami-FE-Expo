import { getDailyDocuments, getWeeklyDocuments } from "@/api/document";
import { queryKeys } from "@/constants";
import { useDocumentPostStore } from "@/store/documentPostStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface UseGetDocumentsProps {
  enabled?: boolean;
}

/**
 * 일간 인기 자료를 조회하는 훅
 */
function useGetDailyDocuments({ enabled = true }: UseGetDocumentsProps = {}) {
  const { setDailyDocuments } = useDocumentPostStore();

  const query = useQuery({
    queryFn: getDailyDocuments,
    queryKey: [
      queryKeys.GET_POST,
      queryKeys.GET_DOCUMENT,
      queryKeys.GET_DAILY_DOCUMENTS,
    ],
    enabled,
  });

  // 데이터가 변경될 때만 저장소 업데이트
  useEffect(() => {
    if (query.data?.documentPostsPage?.content) {
      setDailyDocuments(query.data.documentPostsPage.content);
    }
  }, [query.data, setDailyDocuments]);

  return query;
}

/**
 * 주간 인기 자료를 조회하는 훅
 */
function useGetWeeklyDocuments({ enabled = true }: UseGetDocumentsProps = {}) {
  const { setWeeklyDocuments } = useDocumentPostStore();

  const query = useQuery({
    queryFn: getWeeklyDocuments,
    queryKey: [
      queryKeys.GET_POST,
      queryKeys.GET_DOCUMENT,
      queryKeys.GET_WEEKLY_DOCUMENTS,
    ],
    enabled,
  });

  // 데이터가 변경될 때만 저장소 업데이트
  useEffect(() => {
    if (query.data?.documentPostsPage?.content) {
      setWeeklyDocuments(query.data.documentPostsPage.content);
    }
  }, [query.data, setWeeklyDocuments]);

  return query;
}

export { useGetDailyDocuments, useGetWeeklyDocuments };
