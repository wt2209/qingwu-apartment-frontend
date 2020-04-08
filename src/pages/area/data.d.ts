export interface AreaListItem {
  id: number;
  title: string;
  description?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface AreaListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface AreaListData {
  list: AreaListItem[];
  pagination: Partial<AreaListPagination>;
}

export interface AreaListParams {
  sorter?: string;
  status?: string;
  title?: string;
  description?: string;
  id?: number;
  pageSize?: number;
  currentPage?: number;
}
