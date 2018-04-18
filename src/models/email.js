import {getCard, sendCard} from '../services/card/api';

export default {
  namespace: 'email',

  state: {
    cards: [],
  },

  effects: {

    * send({payload}, {call, put}) {
       yield call(sendCard, payload);
    },

    * fetchcards({payload}, {call, put}) {

      const response = yield call(getCard, payload);
      yield put({
        type: 'savecards',
        payload: response,
      });
    },
  },

  reducers: {
    savecards(state, action) {
      return {
        ...state,
        cards: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },
  },
};
