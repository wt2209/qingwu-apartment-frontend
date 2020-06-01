import request from '@/utils/request';
import { TableListParams, ChargeRuleListItem } from './data';

export async function getAllChargeRules() {
  return request('/api/all-charge-rules');
}

export async function queryChargeRule(params?: TableListParams) {
  return request('/api/charge-rules', {
    params,
  }).then(res => ({
    data: res.data,
    total: res.meta.total,
    success: true,
    pageSize: res.meta.per_page,
    current: res.meta.current_page
  }))
}

export async function removeChargeRule(id: number) {
  return request(`/api/charge-rules/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  });
}

export async function restoreChargeRule(id: number) {
  return request(`/api/charge-rules/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  });
}

export async function addChargeRule(data: Partial<ChargeRuleListItem>) {
  return request('/api/charge-rules', {
    method: 'POST',
    data,
  });
}

export async function updateChargeRule(id: number, data: Partial<ChargeRuleListItem>) {
  return request(`/api/charge-rules/${id}`, {
    method: 'POST',
    data: {
      ...data,
      _method: 'put',
    },
  });
}
