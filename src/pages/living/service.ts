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
