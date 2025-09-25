import { getNoticeFilter } from "@/api/notice";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

interface UseGetNoticesProps {
  enabled?: boolean;
}

function useGetNoticeFilter({ enabled = true }: UseGetNoticesProps = {}) {
  const query = useQuery({
    queryFn: getNoticeFilter,
    queryKey: [
      queryKeys.GET_POST,
      queryKeys.GET_NOTICE,
      queryKeys.GET_NOTICE_POSTS,
    ],
    enabled,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
  });

  return query;
}

export { useGetNoticeFilter };
