import request from '@/utils/request';
import { getDvaApp } from 'umi';
import { AreaListParams } from './data';

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

export async function queryExportArea(params: AreaListParams) {
  return request('/api/areas', {
    params: {
      ...params,
      page: params && params.current,
    },
  })
}

export async function removeArea(id: number) {
  return request(`/api/areas/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'living/reset',
    })
    store.dispatch({
      type: 'area/reset',
    })
    return res
  })
}

export async function restoreArea(id: number) {
  return request(`/api/areas/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'living/reset',
    })
    store.dispatch({
      type: 'area/reset',
    })
    return res
  })
}

export async function addArea(params: AreaListParams) {
  return request('/api/areas', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'living/reset',
    })
    store.dispatch({
      type: 'area/reset',
    })
    return res
  })
}

export async function updateArea(id: number, params: AreaListParams) {
  return request(`/api/areas/${id}`, {
    method: 'POST',
    data: {
      ...params,
      _method: 'put',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'living/reset',
    })
    store.dispatch({
      type: 'area/reset',
    })
    return res
  })
}
