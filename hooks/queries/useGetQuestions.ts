import {
  getDailyQuestions,
  getWeeklyQuestions,
  getQuestionsFilter,
} from "@/api/question";
import { queryKeys } from "@/constants";
import { useQuestionPostStore } from "@/store/questionPostStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface UseGetQuestionsProps {
  enabled?: boolean;
}

function useGetDailyQuestions({ enabled = true }: UseGetQuestionsProps = {}) {
  const { setDailyQuestions } = useQuestionPostStore();

  const query = useQuery({
    queryFn: getDailyQuestions,
    queryKey: [
      queryKeys.GET_POST,
      queryKeys.GET_QUESTION,
      queryKeys.GET_DAILY_QUESTIONS,
    ],
    enabled,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query.data?.questionPostsPage?.content) {
      setDailyQuestions(query.data.questionPostsPage.content);
    }
  }, [query.data, setDailyQuestions]);

  return query;
}

function useGetWeeklyQuestions({ enabled = true }: UseGetQuestionsProps = {}) {
  const { setWeeklyQuestions } = useQuestionPostStore();

  const query = useQuery({
    queryFn: getWeeklyQuestions,
    queryKey: [
      queryKeys.GET_POST,
      queryKeys.GET_QUESTION,
      queryKeys.GET_WEEKLY_QUESTIONS,
    ],
    enabled,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query.data?.questionPostsPage?.content) {
      setWeeklyQuestions(query.data.questionPostsPage.content);
    }
  }, [query.data, setWeeklyQuestions]);

  return query;
}

function useGetQuestionsFilter({ enabled = true }: UseGetQuestionsProps = {}) {
  const { setFilteredQuestions } = useQuestionPostStore();

  const query = useQuery({
    queryFn: getQuestionsFilter,
    queryKey: [
      queryKeys.GET_POST,
      queryKeys.GET_QUESTION,
      queryKeys.GET_FILTERED_QUESTIONS,
    ],
    enabled,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query.data?.questionPostsPage?.content) {
      setFilteredQuestions(query.data.questionPostsPage.content);
    }
  }, [query.data, setFilteredQuestions]);

  return query;
}

export { useGetDailyQuestions, useGetWeeklyQuestions, useGetQuestionsFilter };
