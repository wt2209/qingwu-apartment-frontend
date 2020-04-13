import request from '@/utils/request';
import { ResponseListData } from '@/global.d';

export interface LivingFetchParams {
  area?: string;
  building?: string;
  unit?: string;
  keyword?: string;
}

export async function query(params: LivingFetchParams): Promise<any> {
  return request('/api/livings', {
    params,
  });
}

export async function queryTree(): Promise<ResponseListData> {
  return request('/api/room-tree');
}
