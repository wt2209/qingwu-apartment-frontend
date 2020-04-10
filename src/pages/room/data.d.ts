import { AreaListItem } from "../area/data";

export interface RoomListItem {
  id: number;
  title: string;
  unit: string;
  building: string;
  area: AreaListItem;
  category: any;
  rent: number;
  number: number;
  deletedAt?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
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
  page?: number;
}
