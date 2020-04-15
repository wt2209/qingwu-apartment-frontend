export interface ChargeRuleListItem {
  id: number;
  title: string;
  rule: ChargeRule[];
  period: number;
  remark: string;
  updated_at: Date | undefined;
  created_at: Date | undefined;
  deleted_at: Date | undefined;
}

export interface ChargeRule {
  name: string;
  fee: number[];
  turn_in: boolean;
  rate: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: ChargeRuleListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
