import request from '@/utils/request';
import { OperationListParams } from './data.d';

export async function queryOperation(params?: OperationListParams) {
  return request('/api/system/operations', {
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
