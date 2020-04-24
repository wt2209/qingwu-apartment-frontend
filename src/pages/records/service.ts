import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRecord(params?: TableListParams) {
  return request('/api/records', {
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