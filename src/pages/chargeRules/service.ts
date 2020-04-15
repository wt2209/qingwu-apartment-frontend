import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryChargeRule(params?: TableListParams) {
  return request('/api/charge-rules', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/charge-rules', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
