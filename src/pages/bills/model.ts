import { Effect, Reducer } from 'umi';
import { BillListParams, BillListItem } from './data';
import { queryBill, updateBill, addBill } from './service';

export interface BillModelState {
  params: BillListParams;
  list: BillListItem[] | undefined;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  }
}

export interface BillModelType {
  namespace: 'bill';
  state: BillModelState;
  effects: {
    fetch: Effect;
    create: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<BillModelState>;
    reset: Reducer<Partial<BillModelState>>;
  };
}

const BillModel: BillModelType = {
  namespace: 'bill',
  state: {
    params: {},
    list: undefined,
    pagination: {
      total: 0,
      current: 1,
      pageSize: 20,
    }
  },
  effects: {
    *fetch({ payload }, { put, call }) {
      const params = { current: 1, pageSize: 20, ...payload }
      const { data, meta } = yield call(queryBill, params);
      yield put({
        type: 'save',
        payload: {
          list: data,
          params,
          pagination: {
            total: meta?.total || 0,
            current: meta?.current_page || 1,
            pageSize: meta?.per_page || 20,
          }
        }
      });
    },
    *create({ payload }, { call, put, select }) {
      const res = yield call(addBill, payload)
      if (res && res.message) {
        const params = yield select(({ bill }: { bill: BillModelState }) => bill.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *update({ payload }, { call, put, select }) {
      const res = yield call(updateBill, payload)
      if (res && res.message) {
        const params = yield select(({ bill }: { bill: BillModelState }) => bill.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
  },
  reducers: {
    save(state, action) {
      const { list, params, pagination } = action.payload;
      return {
        ...state,
        ...action.payload,
        params: params || {}, // 需要重置params
        list,
        pagination,
      };
    },
    reset() {
      return {
        params: {},
        list: undefined,
        pagination: {
          total: 0,
          current: 1,
          pageSize: 20,
        }
      }
    }
  },
};

export default BillModel;
