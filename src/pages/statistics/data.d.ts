import { Moment } from "moment";

export interface LivingStatisticsList {
  area: string,
  category: string,
  rooms_all_count: number,
  rooms_used_count: number,
  rooms_empty_count: number,
  people_count: number | string,
  companies_count: number | string,
}

export interface BillStatisticsList {
  title: string;
  money: number;
}

export interface LivingStatisticsParams {
  areas?: number[];
  types?: string[];
  categories?: number[];
  room?: string;
}

export interface BillStatisticsParams {
  range?: Moment[]; // 开始时间, 结束时间
  fee_types?: string[]; // 费用类型
  areas?: number[]; // id
  location?: string;
  name?: string;
  turn_in?: 'yes' | 'no' | 'all';
  is_refund?: 0 | 1; // true false
}

export interface RepairStatisticsParams {

}
