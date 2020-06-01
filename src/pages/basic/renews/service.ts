import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryRenew(params?: TableListParams) {
  return request('/api/renews', {
    params: {
      ...params,
      page: params && params.current,
    },
  }).then(res => ({
    data: res.data,
    total: res.meta.total,
    success: true,
    pageSize: res.meta.per_page,
    current: res.meta.current_page
  }))
}

export async function queryExportRenew(params?: TableListParams) {
  return request('/api/renews', {
    params: {
      ...params,
      page: params && params.current,
    },
  })
}
