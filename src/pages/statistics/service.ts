import { LivingStatisticsParams, BillStatisticsParams, RepairStatisticsParams } from "./data";
import request from "@/utils/request";

export async function getLivingStatistics(params: LivingStatisticsParams) {
  return request('/api/statistics/living', {
    params
  })
}

export async function getBillStatistics(params: BillStatisticsParams) {
  return request('/api/statistics/bill', {
    params
  })
}

export async function getRepairStatistics(params: RepairStatisticsParams) {
  return request('/api/statistics/bill', {
    params
  })
}
