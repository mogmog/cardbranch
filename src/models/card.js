import { queryAlerts } from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    list: [],
  },

  effects: {
    *fetchalerts({ payload }, { call, put }) {
      const response = yield call(queryAlerts, payload);

      yield put({
        type: 'queryAlerts',
        payload: response,
      });
    },
  },

  reducers: {
    queryAlerts(state, action) {
      return {
        ...state,
        list: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

  },
};
