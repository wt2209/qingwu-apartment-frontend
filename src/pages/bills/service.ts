import request from '@/utils/request';
import { BillListParams } from './data.d';

export async function queryBill(params?: BillListParams) {
  return request('/api/bills', {
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
  }));
}

export async function queryExportBill(params?: BillListParams) {
  return request('/api/bills', {
    params: {
      ...params,
      page: params && params.current,
    },
  })
}

export async function generateBill(data: { date: string; export: boolean }) {
  return request('/api/bills/generate', {
    method: 'POST',
    data
  })
}

export async function removeBill(params: { id: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addBill(params: BillListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateBill(params: BillListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
