// src/types/api/responses/reportDto.ts
import { Report } from "@/types/entities/postgres/report";

export interface ReportDto {
  report?: Report;
}
