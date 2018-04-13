import {queryCards} from '../services/card/api';

export default {
  namespace: 'battleground',

  state: {
    cardllist_left:  [],
    cardllist_right: []
  },

  effects: {

    * fetchcards_left({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savedistrictcards_left',
        payload: response,
      });
    },

    * fetchcards_right({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savedistrictcards_right',
        payload: response,
      });
    },

  },

  reducers: {

    savedistrictcards_left(state, action) {
      return {
        ...state,
        cardllist_left: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

    savedistrictcards_right(state, action) {
      return {
        ...state,
        cardllist_right: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

    clear(state, action) {

      return {
        ...state,
        cardllist_left: [],
        cardllist_right: [],
      };
    },


  },
};
