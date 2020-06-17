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

export async function removeBill(params: { ids: number[] }) {
  return request('/api/bills', {
    method: 'POST',
    data: {
      ...params,
      _method: 'delete',
    },
  });
}

export async function addBill(params: BillListParams) {
  return request('/api/bills', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateBill(params: BillListParams) {
  return request('/api/bills', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
