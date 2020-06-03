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
  fee_type: string;
  money: number;
}

export interface LivingStatisticsParams {
  areas?: number[];
  types?: number[];
  categories?: number[];
}

export interface BillStatisticsParams {

}

export interface RepairStatisticsParams {

}
