import { AreaListItem } from "@/pages/basic/areas/data";
import { Effect, Reducer } from "umi";
import { getAllAreas } from "@/pages/basic/areas/service";

export interface AreaModelState {
  list: AreaListItem[] | undefined;
}

interface AreaModelType {
  namespace: 'area';
  state: AreaModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<AreaModelState>;
    reset: Reducer<AreaModelState>;
  };
}

const AreaModel: AreaModelType = {
  namespace: 'area',
  state: {
    list: undefined
  },
  effects: {
    *fetch(_, { put, call }) {
      const res = yield call(getAllAreas)
      if (res && res.data) {
        yield put({ type: 'save', payload: { areas: res.data } })
      }
    }
  },
  reducers: {
    save(state, action) {
      const { areas } = action.payload
      return {
        list: areas
      }
    },
    reset() {
      return {
        list: undefined
      }
    }
  }
}

export default AreaModel
