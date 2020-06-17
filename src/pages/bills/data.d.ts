import { AreaListItem } from "../basic/areas/data";

export interface BillListItem {
  id: number;
  area: AreaListItem;
  type: 'person' | 'company' | 'other';
  way: 'before' | 'after';
  location: string;
  name: string;
  title: string;
  turn_in: boolean;
  money: number;
  description: string;
  late_base: number | undefined; // 滞纳金基数
  late_rate: number | undefined;
  late_date: Date | undefined;
  charged_at: Date | undefined;
  is_refund: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: BillListItem[];
  pagination: Partial<TableListPagination>;
}

export interface BillListParams {
  area?: string;
  location?: string;
  name?: string;
  title?: string;
  turn_in?: boolean;
  charged_at?: Array<Date>;
  status?: 'charged' | 'uncharged'; // 是否缴费
  pageSize?: number;
  current?: number;
}
