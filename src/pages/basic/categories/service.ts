import request from '@/utils/request';
import { getDvaApp } from 'umi';
import { CategoryListParams, CategoryListItem } from './data';

export async function getAllCategories() {
  return request('/api/all-categories');
}

export async function queryCategory(params: CategoryListParams) {
  const { current, ...rest } = params
  return request('/api/categories', {
    params: {
      ...rest,
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

export async function queryExportCategory(params: CategoryListParams) {
  const { current, ...rest } = params
  return request('/api/categories', {
    params: {
      ...rest,
      page: current,
    },
  })
}

export async function removeCategory(id: string) {
  return request(`/api/categories/${id}`, {
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
      type: 'category/reset',
    })
    return res
  })
}

export async function restoreCategory(id: string) {
  return request(`/api/categories/${id}`, {
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
      type: 'category/reset',
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
    const store = getDvaApp()._store
    store.dispatch({
      type: 'living/reset',
    })
    store.dispatch({
      type: 'category/reset',
    })
    return res
  })
}

export async function updateCategory(id: string, data: Partial<CategoryListItem>) {
  return request(`/api/categories/${id}`, {
    method: 'POST',
    data: {
      ...data,
      _method: 'put',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'living/reset',
    })
    store.dispatch({
      type: 'category/reset',
    })
    return res
  })
}
