import request from '@/utils/request';
import { TableListParams, FeeTypeListItem } from './data';

export async function getAllFeeTypes() {
  return request('/api/all-fee-types');
}

export async function queryFeeType(params?: TableListParams) {
  return request('/api/fee-types', {
    params,
  }).then(res =>
    ({
      data: res.data,
      total: res.meta.total,
      success: true,
      pageSize: res.meta.per_page,
      current: res.meta.current_page
    })
  );
}

export async function queryExportFeeType(params?: TableListParams) {
  return request('/api/fee-types', {
    params,
  })
}

export async function removeFeeType(id: number) {
  return request(`/api/fee-types/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  });
}

export async function restoreFeeType(id: number) {
  return request(`/api/fee-types/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  });
}

export async function addFeeType(data: Partial<FeeTypeListItem>) {
  return request('/api/fee-types', {
    method: 'POST',
    data,
  });
}

export async function updateFeeType(id: number, data: Partial<FeeTypeListItem>) {
  return request(`/api/fee-types/${id}`, {
    method: 'POST',
    data: {
      ...data,
      _method: 'put',
    },
  });
}
