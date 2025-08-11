//  src/types/api/entities/mongo/purchaseHistory.ts
import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";
import { YeopjeonHistory } from "@/types/entities/mongo/yeopjeonHistory";

export interface PurchaseHistory extends BaseMongoEntity {
  purchaseHistoryId?: string;
  memberId?: string;
  documentPostId?: string;
  documentFileId?: string;
  yeopjeonHistory?: YeopjeonHistory;
}
