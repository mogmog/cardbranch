import {queryCards} from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    list: [],
    districtcardllist: []
  },

  /*TODO rename fetchcards to store cards */
  effects: {

    * fetchcards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savecards',
        payload: response,
      });
    },


    * fetchdistrictcards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savedistrictcards',
        payload: response,
      });
    }


  },

  reducers: {
    savecards(state, action) {
      return {
        ...state,
        list: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },


    savedistrictcards(state, action) {
      return {
        ...state,
        districtcardllist: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },


  },
};
