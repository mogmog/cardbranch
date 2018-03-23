import { queryCards } from '../services/card/api';

export default {
  namespace: 'store',

  state: {
    list: [],
  },

  effects: {

    * fetchcards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'querycards',
        payload: response,
      });
    }
  },

  reducers: {
    querycards(state, action) {
      return {
        ...state,
        list: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

  },
};
