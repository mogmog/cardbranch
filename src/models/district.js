import { queryDistrict } from '../services/district/api';

export default {
  namespace: 'district',

  state: {
    geojson: {type : 'FeatureCollection', features : []},
  },

  effects: {

    *fetch({payload}, {call, put}) {
      const response = yield call(queryDistrict, payload);
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
        geojson: action.payload,
      };
    },

    clear(state, action) {
      return {geojson : {type : 'FeatureCollection', features : []}}
    },

  },
};
