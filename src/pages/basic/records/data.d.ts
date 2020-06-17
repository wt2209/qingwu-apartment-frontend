import { UploadFile } from "antd/lib/upload/interface";
import { CategoryListItem } from "../categories/data";
import { AreaListItem } from "../areas/data";
import { CompanyListItem } from "../companies/data";
import { RoomListItem } from "../rooms/data";

export interface RecordListItem {
  id: number;
  room: RoomListItem;
  to_room?: RoomListItem;
  area: AreaListItem;
  area_id: number;
  category: CategoryListItem;
  type: 'person' | 'company' | 'functional';
  record_at?: Date;
  person?: PersonListItem;
  company?: CompanyListItem;
  functional_title: string;
  rent_start?: Date;
  rent_end?: Date;
  charged_to?: Date; // 费用已生成至
  proof_files: UploadFile<any>[];
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: RecordListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
}
