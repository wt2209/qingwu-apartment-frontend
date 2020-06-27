import request from '@/utils/request';
import { getDvaApp } from 'umi'
import { RoomListParams, RoomFormValueType, RoomListItem } from './data';

export async function queryRoom(params: RoomListParams) {
  const { current, ...rest } = params
  return request('/api/rooms', {
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

export async function queryExportRoom(params: RoomListParams) {
  const { current, ...rest } = params
  return request('/api/rooms', {
    params: {
      ...rest,
      page: current,
    },
  })
}

export async function getRoom(id: string) {
  return request(`/api/rooms/${id}`)
}

export async function removeRoom(id: string) {
  return request(`/api/rooms/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    getDvaApp()._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}

export async function restoreRoom(id: string) {
  return request(`/api/rooms/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    getDvaApp()._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}

export async function addRoom(data: Partial<RoomListItem>) {
  return request('/api/rooms', {
    method: 'POST',
    data,
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    getDvaApp()._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}

export async function updateRoom(id: string | undefined, formVals: Partial<RoomFormValueType>) {
  return request(`/api/rooms/${id}`, {
    method: 'POST',
    data: {
      ...formVals,
      _method: 'put',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    getDvaApp()._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}
