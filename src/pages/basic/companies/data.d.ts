export interface CompanyListItem {
  id: string;
  company_name: string;
  manager?: string;
  manager_phone?: string;
  linkman?: string;
  linkman_phone?: string;
  remark?: string;
  updated_at?: Date;
  created_at?: Date;
}

export interface CompanyListParams {
  company_name?: string;
  manager?: string;
  manager_phone?: string;
  linkman?: string;
  linkman_phone?: number;
  pageSize?: number;
  current?: number;
}
