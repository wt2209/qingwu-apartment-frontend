import request from '@/utils/request';
import { RecordListParams } from './data';

export async function queryRecord(params: RecordListParams) {
  const { current, ...rest } = params
  return request('/api/records', {
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

export async function queryExportRecord(params: RecordListParams) {
  const { current, ...rest } = params
  return request('/api/records', {
    params: {
      ...rest,
      page: current,
    },
  })
}
