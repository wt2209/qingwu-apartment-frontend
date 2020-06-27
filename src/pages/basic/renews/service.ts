import request from '@/utils/request';
import { RenewListParams } from './data';

export async function queryRenew(params: RenewListParams) {
  const { current, ...rest } = params
  return request('/api/renews', {
    params: {
      ...rest,
      page: current,
    },
  }).then(res => ({
    data: res.data,
    total: res.meta.total,
    success: true,
    pageSize: res.meta.per_page,
    current: res.meta.current_page
  }))
}

export async function queryExportRenew(params: RenewListParams) {
  const { current, ...rest } = params
  return request('/api/renews', {
    params: {
      ...rest,
      page: current,
    },
  })
}
