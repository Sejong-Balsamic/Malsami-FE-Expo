import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getNoticePosts, getFilteredNoticePosts } from "@/api/notice";
import { queryKeys } from "@/constants";
import { NoticePostDto } from "@/types/responses/noticePostDto";

/**
 * 공지사항 전체 데이터를 가져오는 훅
 */
function useGetNoticePosts(options?: Partial<UseQueryOptions<NoticePostDto>>) {
  return useQuery({
    queryKey: [queryKeys.NOTICE, "posts"],
    queryFn: getNoticePosts,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    refetchOnWindowFocus: true,
    ...options,
  });
}

/**
 * 검색을 통한 공지사항 데이터를 가져오는 훅
 */
function useGetFilteredNoticePosts(filterText: string) {
  return useQuery({
    queryKey: [queryKeys.NOTICE, "filtered", filterText],
    queryFn: () => getFilteredNoticePosts(filterText),
    enabled: !!filterText && filterText.trim().length > 0, // filterText가 있을 때만 실행
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 5, // 5분
  });
}

export { useGetNoticePosts, useGetFilteredNoticePosts };
