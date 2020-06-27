export interface PersonListItem {
  id: string;
  name: string;
  gender?: '男' | '女';
  education?: string;
  serial?: string;
  identify?: string;
  phone?: string;
  department?: string;
  hired_at?: Date;
  contract_start: Date;
  contract_end: Date | string;
  remark?: string;
  created_at?: Date;
  updated_at: Date;
}

export interface PersonListParams {
  name?: string;
  department?: string;
  identify?: string;
  serial?: string;
  phone?: string;
  pageSize?: number;
  current?: number;
}
