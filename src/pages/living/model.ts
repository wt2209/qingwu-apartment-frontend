import { Effect, Reducer } from 'umi';
import { queryLiving, queryTree, createLiving, quitLiving, updateLiving, moveLiving, renewLiving, renameCompany, updateRoom } from './service';
import { LivingListItem, LivingFetchParams } from './data';

export interface ModelState {
  params: LivingFetchParams;
  list: LivingListItem[];
  total: number;
  tree: {
    [area: string]: {
      [building: string]: string[]
    }
  } | undefined;
}

export interface ModelType {
  namespace: 'living';
  state: ModelState;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    fetchTree: Effect;
    create: Effect;
    update: Effect;
    move: Effect;
    quit: Effect;
    renew: Effect;
    rename: Effect;
    editRoom: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
    append: Reducer<Partial<ModelState>>;
    saveTree: Reducer<Partial<ModelState>>;
    reset: Reducer<Partial<ModelState>>;
  };
}

const Model: ModelType = {
  namespace: 'living',
  state: {
    params: {},
    list: [],
    total: 0,
    tree: undefined,
  },
  effects: {
    *fetch({ payload }, { put, call }) {
      const { data, meta } = yield call(queryLiving, payload);
      yield put({
        type: 'save',
        payload: {
          list: data,
          params: payload,
          total: meta?.total || 0,
        }
      });
    },
    *appendFetch(_, { put, call, select }) {
      const params = yield select(({ living }: { living: ModelState }) => living.params)
      const currentPage: number = params?.page ? params.page : 1
      const newParams = { ...params, page: currentPage + 1 }
      const { data } = yield call(queryLiving, newParams)
      yield put({
        type: 'append',
        payload: {
          append: data,
          params: newParams
        }
      })
    },
    *fetchTree(_, { put, call }) {
      const res = yield call(queryTree)
      if (res && res.data) {
        yield put({ type: 'saveTree', payload: { tree: res.data } })
      }
    },
    *create({ payload }, { call, put, select }) {
      const res = yield call(createLiving, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *update({ payload }, { call, put, select }) {
      const res = yield call(updateLiving, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *move({ payload }, { call, put, select }) {
      const res = yield call(moveLiving, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *quit({ payload }, { call, put, select }) {
      const res = yield call(quitLiving, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *renew({ payload }, { call, put, select }) {
      const res = yield call(renewLiving, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *rename({ payload }, { call, put, select }) {
      const res = yield call(renameCompany, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    },
    *editRoom({ payload }, { call, put, select }) {
      const res = yield call(updateRoom, payload)
      if (res && res.message) {
        const params = yield select(({ living }: { living: ModelState }) => living.params)
        yield put({ type: 'fetch', payload: params })
      }
    }
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
    append(state, action) {
      const { append, params } = action.payload;
      return {
        ...state,
        params,
        list: (state && state.list) ? state.list.concat(append) : [],
      };
    },
    saveTree(state, action) {
      const { tree } = action.payload;
      return {
        ...state,
        tree,
      };
    },
    reset() {
      return {
        params: {},
        list: [],
        total: 0,
        tree: undefined,
      }
    }
  },
};

export default Model;
