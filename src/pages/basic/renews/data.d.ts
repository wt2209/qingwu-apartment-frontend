import { RecordListItem } from "../records/data";

export interface RenewListItem {
  id: string;
  record: RecordListItem;
  old_rent_end: Date;
  new_rent_end: Date;
  renewed_at: Date;
  created_at?: Date;
  updated_at: Date;
}

export interface RenewListParams {
  pageSize?: number;
  current?: number;
}
