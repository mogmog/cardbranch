import {queryHeatmap} from '../services/heatmap/api';

export default {
  namespace: 'heatmap',

  state: {
    geojson: {type: 'FeatureCollection', features: []},
  },

  effects: {

    * fetch({payload}, {call, put}) {

      const response = yield call(queryHeatmap, payload);

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
      return {geojson: {type: 'FeatureCollection', features: []}}
    },

  },
};
