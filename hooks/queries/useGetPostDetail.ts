import { getDocumentPost } from "@/api/document";
import { getQuestionPost } from "@/api/question";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

interface UseGetPostDetailProps {
  postId: string;
  postType: "document" | "question";
  enabled?: boolean;
}

function useGetDocumentDetail({
  postId,
  enabled = true,
}: {
  postId: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [queryKeys.GET_POST, queryKeys.GET_DOCUMENT, "detail", postId],
    queryFn: () => getDocumentPost(postId),
    enabled: enabled && !!postId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
}

function useGetQuestionDetail({
  postId,
  enabled = true,
}: {
  postId: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [queryKeys.GET_POST, queryKeys.GET_QUESTION, "detail", postId],
    queryFn: () => getQuestionPost(postId),
    enabled: enabled && !!postId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
}

function useGetPostDetail({
  postId,
  postType,
  enabled = true,
}: UseGetPostDetailProps) {
  const documentQuery = useGetDocumentDetail({
    postId,
    enabled: enabled && postType === "document",
  });

  const questionQuery = useGetQuestionDetail({
    postId,
    enabled: enabled && postType === "question",
  });

  if (postType === "document") {
    return {
      ...documentQuery,
      data: documentQuery.data?.documentPost,
      files: documentQuery.data?.documentFiles,
      type: "document" as const,
    };
  }

  return {
    ...questionQuery,
    data: questionQuery.data?.questionPost,
    type: "question" as const,
  };
}

export { useGetPostDetail, useGetDocumentDetail, useGetQuestionDetail };
