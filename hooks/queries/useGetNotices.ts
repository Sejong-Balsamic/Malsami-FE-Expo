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
  });

  return query;
}

export { useGetNoticeFilter };
