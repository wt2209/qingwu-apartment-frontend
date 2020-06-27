import { AreaListItem } from "../basic/areas/data";

export interface BillListItem {
  id: string; // uuid
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
  should_charge_at: Date | undefined;
  is_refund: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BillFormValueType {
  type: 'person' | 'company' | 'other';
  area_id: number;
  location: string;
  name: string;
  title: string;
  money: number;
  description: string;
  late_date: string;
  late_rate: number;
  late_base: number;
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
