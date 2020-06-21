import request from '@/utils/request';
import { getDvaApp } from 'umi';
import { TableListParams, FeeTypeListItem } from './data';

export async function getAllFeeTypes() {
  return request('/api/all-fee-types');
}

export async function queryFeeType(params?: TableListParams) {
  return request('/api/fee-types', {
    params,
  }).then(res =>
    ({
      data: res.data,
      total: res.meta.total,
      success: true,
      pageSize: res.meta.per_page,
      current: res.meta.current_page
    })
  );
}

export async function queryExportFeeType(params?: TableListParams) {
  return request('/api/fee-types', {
    params,
  })
}

export async function removeFeeType(id: number) {
  return request(`/api/fee-types/${id}`, {
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

export async function restoreFeeType(id: number) {
  return request(`/api/fee-types/${id}`, {
    method: 'POST',
    data: {
      _method: 'patch',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'feeType/reset',
    })
    return res
  })
}

export async function addFeeType(data: Partial<FeeTypeListItem>) {
  return request('/api/fee-types', {
    method: 'POST',
    data,
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'feeType/reset',
    })
    return res
  })
}

export async function updateFeeType(id: number, data: Partial<FeeTypeListItem>) {
  return request(`/api/fee-types/${id}`, {
    method: 'POST',
    data: {
      ...data,
      _method: 'put',
    },
  }).then(res => {
    // eslint-disable-next-line no-underscore-dangle
    const store = getDvaApp()._store
    store.dispatch({
      type: 'feeType/reset',
    })
    return res
  })
}
