import { QuestionDto } from "@/types/responses/questionDto";
import { axiosInstance } from "./axios";

async function getDailyQuestions(): Promise<QuestionDto> {
  const body = new FormData();
  body.append("dummy", "value");
  const { data } = await axiosInstance.post(
    "/api/question/popular/daily",
    body
  );
  return data;
}

async function getWeeklyQuestions(): Promise<QuestionDto> {
  const body = new FormData();
  body.append("dummy", "value");
  const { data } = await axiosInstance.post(
    "/api/question/popular/weekly",
    body
  );
  return data;
}

export { getDailyQuestions, getWeeklyQuestions };
