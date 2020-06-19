import request from '@/utils/request';
import { BillListParams } from './data.d';

export async function queryBill(params?: BillListParams) {
  return request('/api/bills', {
    params: {
      ...params,
      page: params && params.current,
    },
  })
}

export async function generateBill(data: { date: string; export: boolean, save: boolean }) {
  return request('/api/bills/generate', {
    method: 'POST',
    data
  })
}

export async function removeBill(params: { ids: string[] }) {
  return request('/api/bills', {
    method: 'POST',
    data: {
      ...params,
      _method: 'delete',
    },
  });
}

export async function addBill(data: BillListParams) {
  return request('/api/bills', {
    method: 'POST',
    data,
  });
}

export async function updateBill(id: string, params: BillListParams) {
  return request(`/api/bills/${id}`, {
    method: 'POST',
    data: {
      ...params,
      _method: 'put',
    },
  });
}
