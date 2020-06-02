export interface LivingStatisticsList {
  area: string,
  type: 'person' | 'company' | 'functional',
  category: string,
  rooms_all_count: number,
  rooms_used_count: number,
  rooms_empty_count: number,
  people_count: number,
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
