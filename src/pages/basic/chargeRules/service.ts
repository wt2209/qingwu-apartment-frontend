import request from '@/utils/request';
import { ChargeRuleListParams, ChargeRuleListItem } from './data';

export async function getAllChargeRules() {
  return request('/api/all-charge-rules');
}

export async function queryChargeRule(params: ChargeRuleListParams) {
  const { current, ...rest } = params
  return request('/api/charge-rules', {
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

export async function removeChargeRule(id: string) {
  return request(`/api/charge-rules/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  });
}

export async function restoreChargeRule(id: string) {
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

export async function updateChargeRule(id: string, data: Partial<ChargeRuleListItem>) {
  return request(`/api/charge-rules/${id}`, {
    method: 'POST',
    data: {
      ...data,
      _method: 'put',
    },
  });
}
