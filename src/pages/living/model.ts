import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryLiving, queryTree, createLiving, quitLiving, updateLiving, moveLiving } from './service';
import { LivingListItem, LivingFetchParams } from './data';
import { AreaListItem } from '../area/data';
import { CategoryListItem } from '../categories/data';
import { getAllAreas } from '../area/service';
import { getAllCategories } from '../categories/service';

export interface ModelState {
  params: LivingFetchParams;
  list: LivingListItem[];
  total: number;
  tree: {
    [area: string]: {
      [building: string]: string[]
    }
  } | undefined;
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
}

export interface ModelType {
  namespace: 'living';
  state: ModelState;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    fetchTree: Effect;
    fetchAreas: Effect;
    fetchCategories: Effect;
    create: Effect;
    update: Effect;
    move: Effect;
    quit: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
    append: Reducer<Partial<ModelState>>;
    saveTree: Reducer<Partial<ModelState>>;
    saveAreas: Reducer<Partial<ModelState>>;
    saveCategories: Reducer<Partial<ModelState>>;
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
    areas: undefined,
    categories: undefined,
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
    *fetchAreas(_, { put, call }) {
      const res = yield call(getAllAreas)
      if (res && res.data) {
        yield put({ type: 'saveAreas', payload: { areas: res.data } })
      }
    },
    *fetchCategories(_, { put, call }) {
      const res = yield call(getAllCategories)
      if (res && res.data) {
        yield put({ type: 'saveCategories', payload: { categories: res.data } })
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
    saveAreas(state, action) {
      const { areas } = action.payload;
      return {
        ...state,
        areas,
      };
    },
    saveCategories(state, action) {
      const { categories } = action.payload;
      return {
        ...state,
        categories,
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
