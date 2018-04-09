import {queryCards} from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    storecardlist: [],
    districtcardllist: []
  },

  /*TODO rename fetchcards to store cards */
  effects: {

    * fetchstorecards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savestorecards',
        payload: response,
      });
    },


    * fetchdistrictcards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savedistrictcards',
        payload: response,
      });
    },
  },

  reducers: {
    savestorecards(state, action) {
      return {
        ...state,
        storecardlist: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

    clearstorecards(state, action) {
      return {
        ...state,
        storecardlist: [],
      };
    },

    savedistrictcards(state, action) {
      return {
        ...state,
        districtcardllist: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

    cleardistrictcards(state, action) {
      return {
        ...state,
        districtcardllist: [],
      };
    },


  },
};
