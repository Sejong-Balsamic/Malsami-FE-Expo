import { getNoticePosts } from "@/api/notice";
import { queryKeys } from "@/constants";
import { useNoticePostStore } from "@/store/noticePostStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface UseGetNoticePostsProps {
  enabled?: boolean;
}

function useGetNoticePosts({ enabled = true }: UseGetNoticePostsProps = {}) {
  const queryClient = useQueryClient();
  const { setIsLoading, setError, updateFromDto } = useNoticePostStore();

  const query = useQuery({
    queryFn: getNoticePosts,
    queryKey: [queryKeys.GET_NOTICE, queryKeys.GET_NOTICE_POSTS],
    enabled,
  });

  const { data, isLoading, error } = query;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (error) {
      setError(error as Error);
    }
  }, [error, setError]);

  useEffect(() => {
    if (data) {
      updateFromDto(data);
    }
  }, [data, updateFromDto]);

  const prefetchNextPage = async () => {
    if (
      data?.noticePostsPage &&
      data.noticePostsPage.number < data.noticePostsPage.totalPages - 1
    ) {
      await queryClient.prefetchQuery({
        queryFn: getNoticePosts,
        queryKey: [queryKeys.GET_NOTICE, queryKeys.GET_NOTICE_POSTS],
      });
    }
  };

  return {
    ...query,
    prefetchNextPage,
  };
}

export default useGetNoticePosts;
