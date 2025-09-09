import {
  getDailyDocuments,
  getWeeklyDocuments,
  getDocumentsFilter,
} from "@/api/document";
import { queryKeys } from "@/constants";
import { useDocumentPostStore } from "@/store/documentPostStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface UseGetDocumentsProps {
  enabled?: boolean;
}

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

  useEffect(() => {
    if (query.data?.documentPostsPage?.content) {
      setDailyDocuments(query.data.documentPostsPage.content);
    }
  }, [query.data, setDailyDocuments]);

  return query;
}

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

  useEffect(() => {
    if (query.data?.documentPostsPage?.content) {
      setWeeklyDocuments(query.data.documentPostsPage.content);
    }
  }, [query.data, setWeeklyDocuments]);

  return query;
}

function useGetDocumentsFilter({ enabled = true }: UseGetDocumentsProps = {}) {
  const { setFilteredDocuments } = useDocumentPostStore();

  const query = useQuery({
    queryFn: getDocumentsFilter,
    queryKey: [
      queryKeys.GET_POST,
      queryKeys.GET_DOCUMENT,
      queryKeys.GET_FILTERED_DOCUMENTS,
    ],
    enabled,
  });

  useEffect(() => {
    if (query.data?.documentPostsPage?.content) {
      setFilteredDocuments(query.data.documentPostsPage.content);
    }
  }, [query.data, setFilteredDocuments]);

  return query;
}

export { useGetDailyDocuments, useGetWeeklyDocuments, useGetDocumentsFilter };
