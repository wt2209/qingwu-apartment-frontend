export interface CategoryListItem {
  id: string;
  title: string;
  type: 'person' | 'company' | 'functional';
  utility_type: string;
  remark: string;
  updated_at: Date | null;
  created_at: Date | null;
  deleted_at: Date | null;
}

export interface CategoryListParams {
  type?: 'person' | 'company' | 'functional';
  status?: 'all' | 'using' | 'deleted';
  pageSize?: number;
  current?: number;
}
