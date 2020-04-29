import { CategoryListItem } from "../categories/data";
import { AreaListItem } from "../area/data";
import { CompanyListItem } from "../companies/data";
import { RoomListItem } from "../room/data";

export interface RecordListItem {
  id: number;
  room: RoomListItem;
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
  proof_files: Array<{ name: string, path: string }>;
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
