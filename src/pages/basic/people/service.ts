import request from '@/utils/request';
import { PersonListParams } from './data';

export async function queryPerson(params: PersonListParams) {
  const { current, ...rest } = params
  return request('/api/people', {
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

export async function queryExportPerson(params: PersonListParams) {
  const { current, ...rest } = params
  return request('/api/people', {
    params: {
      ...rest,
      page: current,
    },
  })
}

export async function getOnePerson(params: { [key: string]: string }) {
  return request('/api/one-person', {
    params
  })
}
