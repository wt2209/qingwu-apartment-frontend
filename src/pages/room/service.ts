import request from '@/utils/request';
import { RoomListParams } from './data.d';

export async function queryRoom(params?: RoomListParams) {
  return request('/api/rooms', {
    params,
  });
}

export async function removeRoom(params: { key: number[] }) {
  return request('/api/rooms', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
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

export async function updateRoom(params: RoomListParams) {
  return request('/api/rooms', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
