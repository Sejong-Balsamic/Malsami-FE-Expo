import { DocumentDto } from "@/types/responses/documentDto";
import { axiosInstance } from "./axios";

async function getDailyDocuments(): Promise<DocumentDto> {
  const body = new FormData();
  body.append("dummy", "value");
  const { data } = await axiosInstance.post(
    "/api/document/popular/daily",
    body
  );
  return data;
}

async function getWeeklyDocuments(): Promise<DocumentDto> {
  const body = new FormData();
  body.append("dummy", "value");
  const { data } = await axiosInstance.post(
    "/api/document/popular/weekly",
    body
  );
  return data;
}

export { getDailyDocuments, getWeeklyDocuments };
