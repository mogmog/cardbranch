import { queryStores } from '../services/store/api';

export default {
  namespace: 'store',

  state: {
    list: [],
  },

  effects: {

    * fetch({payload}, {call, put}) {
      const response = yield call(queryStores, payload);
      yield put({
        type: 'querystores',
        payload: response,
      });
    }
  },

  reducers: {
    querystores(state, action) {

      return {
        ...state,
        list: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

  },
};
