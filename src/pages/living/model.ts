import { Effect } from 'dva';
import { Reducer } from 'redux';
import { query, LivingFetchParams } from './service';
import { LivingListItem } from './data';

export interface ModelState {
  params: LivingFetchParams;
  data: {
    list: LivingListItem[];
  };
}
export interface ModelType {
  namespace: 'livings';
  state: ModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
  };
}
const Model: ModelType = {
  namespace: 'livings',
  state: {
    params: {},
    data: {
      list: [],
    },
  },
  effects: {
    *fetch({ payload, callback }, { put, call }) {
      const response = yield call(query, payload);
      yield put({ type: 'save', payload: { data: response.data, params: payload } });
    },
  },
  reducers: {
    save(state, action) {
      const { data, params } = action.payload;
      return {
        params, // 需要重置params
        data,
      };
    },
  },
};

export default Model;
