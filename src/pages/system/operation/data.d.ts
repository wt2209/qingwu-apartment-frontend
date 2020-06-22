export interface OperationListItem {
  id: number;
  ip: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  path: string;
  user: {
    name: string;
  };
  created_at: Date,
}

export interface OperationListParams {
  user?: string;
  ip?: string;
  path?: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  pageSize?: number;
  current?: number;
}
