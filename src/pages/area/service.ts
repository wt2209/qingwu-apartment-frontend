import request from '@/utils/request';
import { AreaListParams } from './data.d';

export async function queryArea(params?: AreaListParams) {
  return request('/api/areas', {
    params,
  });
}

export async function removeArea(params: { key: number[] }) {
  return request('/api/areas', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
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

export async function updateArea(params: AreaListParams) {
  return request('/api/areas', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
