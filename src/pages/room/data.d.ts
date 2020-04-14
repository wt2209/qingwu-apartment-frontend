import { AreaListItem } from "../area/data";

export interface RoomFormValueType {
  title: string | undefined;
  building: string | undefined;
  unit: string | undefined;
  number: number | undefined;
  area_id: number | undefined;
  category_id: number | undefined;
  remark: string | undefined;
}


export interface RoomListItem {
  id: number;
  title: string;
  unit: string;
  building: string;
  area?: AreaListItem;
  category?: any;
  number: number;
  remark: string | undefined;
  deleted_at?: Date | null;
  updated_at?: Date;
  created_at?: Date;
}

export interface RoomListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RoomListData {
  list: RoomListItem[];
  pagination: Partial<RoomListPagination>;
}

export interface RoomListParams {
  title?: string;
  building?: string;
  unit?: string;
  sorter?: string;
  status?: string;
  pageSize?: number;
  current?: number;
}
