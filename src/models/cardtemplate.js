import { queryTemplates } from '../services/cardtemplate/api';

export default {
  namespace: 'cardtemplate',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTemplates, payload);

      yield put({
        type: 'queryTemplates',
        payload: response,
      });
    },
  },

  reducers: {
    queryTemplates(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },

  },
};
