import request from '@/utils/request';

export interface LivingFetchParams {
  keyword?: string;
  selectedBuilding?: string;
  selectedUnit?: string;
}
export async function query(params: LivingFetchParams): Promise<any> {
  return request('/api/livings', {
    params,
  });
}
