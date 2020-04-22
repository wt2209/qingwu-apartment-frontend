export interface CompanyListItem {
  id: number;
  company_name: string;
  manager?: string;
  manager_phone?: string;
  linkman?: string;
  linkman_phone?: string;
  remark?: string;
  updated_at?: Date;
  created_at?: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: CompanyListItem[];
  pagination: Partial<TableListPagination>;
}

export interface CompanyListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
}
