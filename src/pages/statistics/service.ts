import request from "@/utils/request";
import { LivingStatisticsParams, BillStatisticsParams, RepairStatisticsParams } from "./data";

export async function getLivingStatistics(params: LivingStatisticsParams) {
  return request('/api/statistics/living', {
    params
  })
}

export async function getBillStatistics(params: BillStatisticsParams) {
  const { range, ...rest } = params

  const start = range && range[0] ? range[0].format('YYYY-MM-DD') : null
  const end = range && range[1] ? range[1].format('YYYY-MM-DD') : null

  return request('/api/statistics/bill', {
    params: {
      start,
      end,
      ...rest,
    }
  })
}

export async function getRepairStatistics(params: RepairStatisticsParams) {
  return request('/api/statistics/bill', {
    params
  })
}
