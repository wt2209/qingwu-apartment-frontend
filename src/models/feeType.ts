import { Effect, Reducer } from "umi";
import { FeeTypeListItem } from "@/pages/basic/feeTypes/data";
import { getAllFeeTypes } from "@/pages/basic/feeTypes/service";

export interface FeeTypeModelState {
  list: FeeTypeListItem[] | undefined;
}

interface FeeTypeModelType {
  namespace: 'feeType';
  state: FeeTypeModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<FeeTypeModelState>;
    reset: Reducer<FeeTypeModelState>;
  };
}

const FeeTypeModel: FeeTypeModelType = {
  namespace: 'feeType',
  state: {
    list: undefined
  },
  effects: {
    *fetch(_, { put, call }) {
      const res = yield call(getAllFeeTypes)
      if (res && res.data) {
        yield put({ type: 'save', payload: { feeType: res.data } })
      }
    }
  },
  reducers: {
    save(state, action) {
      const { feeType } = action.payload
      return {
        list: feeType
      }
    },
    reset() {
      return {
        list: undefined
      }
    }
  }
}

export default FeeTypeModel
