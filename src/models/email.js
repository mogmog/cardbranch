import {getCard} from '../services/card/api';

export default {
  namespace: 'email',

  state: {
    cards: [],
  },

  /*TODO rename fetchcards to store cards */
  effects: {

    * fetchcards({payload}, {call, put}) {
      console.log(payload);
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
