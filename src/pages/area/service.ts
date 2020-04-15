import request from '@/utils/request';
import { AreaListParams } from './data.d';

export async function getAllAreas() {
  return request('/api/all-areas');
}

export async function queryArea(params?: AreaListParams) {
  return request('/api/areas', {
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

export async function removeArea(id: number) {
  return request(`/api/areas/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  });
}

export async function restoreArea(id: number) {
  return request(`/api/areas/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  });
}

export async function addArea(params: AreaListParams) {
  return request('/api/areas', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateArea(id: number, params: AreaListParams) {
  return request(`/api/areas/${id}`, {
    method: 'POST',
    data: {
      ...params,
      _method: 'put',
    },
  });
}
