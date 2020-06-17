import { Effect, Reducer } from "umi";
import { CategoryListItem } from "@/pages/basic/categories/data";
import { getAllCategories } from "@/pages/basic/categories/service";

export interface CategoryModelState {
  list: CategoryListItem[] | undefined;
}

interface CategoryModelType {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<CategoryModelState>;
    reset: Reducer<CategoryModelState>;
  };
}

const CategoryModel: CategoryModelType = {
  namespace: 'category',
  state: {
    list: undefined
  },
  effects: {
    *fetch(_, { put, call }) {
      const res = yield call(getAllCategories)
      if (res && res.data) {
        yield put({ type: 'save', payload: { categories: res.data } })
      }
    }
  },
  reducers: {
    save(state, action) {
      const { categories } = action.payload
      return {
        list: categories
      }
    },
    reset() {
      return {
        list: undefined
      }
    }
  }
}

export default CategoryModel
