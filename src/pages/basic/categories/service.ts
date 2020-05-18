import request from '@/utils/request';
import { TableListParams, CategoryListItem } from './data';

export async function getAllCategories() {
  return request('/api/all-categories');
}

export async function queryCategory(params?: TableListParams) {
  return request('/api/categories', {
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

export async function removeCategory(id: number) {
  return request(`/api/categories/${id}`, {
    method: 'POST',
    data: {
      _method: 'delete',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}

export async function restoreCategory(id: number) {
  return request(`/api/categories/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}

export async function addCategory(data: Partial<CategoryListItem>) {
  return request('/api/categories', {
    method: 'POST',
    data,
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}

export async function updateCategory(id: number, data: Partial<CategoryListItem>) {
  return request(`/api/categories/${id}`, {
    method: 'POST',
    data: {
      ...data,
      _method: 'put',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch({
      type: 'living/reset',
    })
    return res
  })
}
