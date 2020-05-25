import { Effect } from 'dva';
import { Reducer } from 'redux';
import { BillListParams, BillListItem } from './data';
import { queryBill, updateBill, addBill } from './service';

export interface ModelState {
  params: BillListParams;
  list: BillListItem[];
  total: number;
}

export interface ModelType {
  namespace: 'bill';
  state: ModelState;
  effects: {
    fetch: Effect;
    create: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
    reset: Reducer<Partial<ModelState>>;
  };
}

const Model: ModelType = {
  namespace: 'bill',
  state: {
    params: {},
    list: [],
    total: 0,
  },
  effects: {
    *fetch({ payload }, { put, call }) {
      const params = { current: 1, pageSize: 20, ...payload }
      const { data, meta } = yield call(queryBill);
      yield put({
        type: 'save',
        payload: {
          list: data,
          params,
          total: meta?.total || 0,
        }
      });
    },
    *create({ payload }, { call, put, select }) {
      const res = yield call(addBill, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *update({ payload }, { call, put, select }) {
      const res = yield call(updateBill, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
  },
  reducers: {
    save(state, action) {
      const { list, params } = action.payload;
      return {
        ...state,
        ...action.payload,
        params: params || {}, // 需要重置params
        list,
      };
    },
    reset() {
      return {
        params: {},
        list: [],
        total: 0,
        tree: undefined,
        areas: undefined,
        categories: undefined,
      }
    }
  },
};

export default Model;
