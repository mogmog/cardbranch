import {addFavourites, clearFavourites} from '../services/favourite/api';
import {connect} from "dva";

export default {
  namespace: 'favourite',

  state: {
  },

  effects: {

    * add({payload}, {call, put}) {
      const response = yield call(addFavourites, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * clear({payload}, {call, put}) {
      const response = yield call(clearFavourites, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },



  },

  reducers: {
    save(state, action) {
      return {
        ...state,
      };
    },
  },
};
