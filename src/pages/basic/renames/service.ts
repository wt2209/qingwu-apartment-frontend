import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryRename(params?: TableListParams) {
  return request('/api/renames', {
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

export async function queryExportRename(params?: TableListParams) {
  return request('/api/renames', {
    params: {
      ...params,
      page: params && params.current,
    },
  })
}
