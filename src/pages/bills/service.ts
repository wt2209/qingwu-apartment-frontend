import request from '@/utils/request';
import { BillListParams } from './data.d';

export async function queryBill(params: BillListParams) {
  const { current, ...rest } = params
  return request('/api/bills', {
    params: {
      ...rest,
      page: current,
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

export async function addBill(data: BillListParams) {
  return request('/api/bills', {
    method: 'POST',
    data,
  });
}

export async function updateBill(id: number, params: BillListParams) {
  return request(`/api/bills/${id}`, {
    method: 'POST',
    data: {
      ...params,
      _method: 'put',
    },
  });
}

export async function chargeBill(
  ids: number[], lates: any[] | undefined, charge_date: string | undefined, way: string
) {
  return request('/api/bills/charge', {
    method: 'POST',
    data: {
      ids,
      lates,
      charge_date,
      way,
    }
  })
}
