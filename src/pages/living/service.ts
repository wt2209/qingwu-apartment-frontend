import request from '@/utils/request';
import { ResponseListData } from '@/global.d';
import { LivingFetchParams } from './data';

export async function queryLiving(params: LivingFetchParams): Promise<any> {
  return request('/api/livings', {
    params,
  });
}

export async function queryTree(): Promise<ResponseListData> {
  return request('/api/room-tree');
}

export async function createLiving(data: any) {
  return request('/api/livings', {
    method: 'POST',
    data
  })
}

export async function updateLiving(data: { id: number }) {
  const { id, ...rest } = data
  return request(`/api/livings/${id}`, {
    method: 'POST',
    data: {
      ...rest,
      _method: 'put'
    }
  })
}

export async function moveLiving(data: { id: number, values: any }) {
  return request(`/api/livings/${data.id}`, {
    method: 'POST',
    data: {
      ...data.values,
      _method: 'patch',
    }
  })
}

export async function renewLiving(data: { id: number, values: any }) {
  return request(`/api/livings/renew/${data.id}`, {
    method: 'POST',
    data: {
      ...data.values,
      _method: 'patch',
    }
  })
}

export async function quitLiving(data: { id: number, values: any }) {
  return request(`/api/livings/${data.id}`, {
    method: 'POST',
    data: {
      ...data.values,
      _method: 'delete',
    }
  })
}

export async function removeFile(path: string) {
  return request('/api/file-remove', {
    method: 'POST',
    data: {
      path,
      _method: 'delete',
    }
  })
}

export async function getOneLiving(recordId: number) {
  return request(`/api/livings/${recordId}`)
}

export async function getMoveList(personId: number) {
  return request(`/api/livings/moves/${personId}`)
}

export async function getRenewList(recordId: number) {
  return request(`/api/livings/renews/${recordId}`)
}
