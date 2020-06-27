export interface FeeTypeListItem {
  id: string;
  title: string;
  turn_in: boolean;
  rate: number;
  remark: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface FeeTypeListParams {
  turn_in?: 1 | 0;
  status?: 'all' | 'deleted' | 'using';
  pageSize?: number;
  current?: number;
}
