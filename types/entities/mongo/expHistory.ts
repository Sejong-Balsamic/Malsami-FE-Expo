//  src/types/api/entities/mongo/expHistory.ts
import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";
import { ExpAction } from "@/types/constants/expActions";

export interface ExpHistory extends BaseMongoEntity {
  expHistoryId?: string;
  memberId?: string;
  expChange?: number;
  expAction?: ExpAction;
  resultExp?: number;
}
