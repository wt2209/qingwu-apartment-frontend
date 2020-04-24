import request from '@/utils/request';
import { CompanyListParams } from './data.d';

export async function queryCompany(params?: CompanyListParams) {
  return request('/api/companies', {
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

export async function getAllCompanies() {
  return request('/api/all-companies');
}

export async function getCompanyByName(params: { [key: string]: string }) {
  return request('/api/one-company', {
    params
  })
}
