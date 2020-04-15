import request from '@/utils/request';
import { RoomListParams, RoomFormValueType } from './data.d';

export async function queryRoom(params?: RoomListParams) {
  return request('/api/rooms', {
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

export async function removeRoom(id: number) {
  return request(`/api/rooms/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  });
}

export async function restoreRoom(id: number) {
  return request(`/api/rooms/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  });
}

export async function addRoom(params: RoomListParams) {
  return request('/api/rooms', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRoom(id: number | undefined, formVals: RoomFormValueType) {
  return request(`/api/rooms/${id}`, {
    method: 'POST',
    data: {
      ...formVals,
      _method: 'put',
    },
  });
}
