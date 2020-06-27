import request from '@/utils/request';
import { CompanyListParams } from './data';

export async function queryCompany(params: CompanyListParams) {
  const { current, ...rest } = params
  return request('/api/companies', {
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
export async function queryExportCompany(params: CompanyListParams) {
  const { current, ...rest } = params
  return request('/api/companies', {
    params: {
      ...rest,
      page: current,
    },
  })
}

export async function getAllCompanies() {
  return request('/api/all-companies');
}

export async function getCompanyByName(params: { [key: string]: string }) {
  return request('/api/one-company', {
    params
  })
}
