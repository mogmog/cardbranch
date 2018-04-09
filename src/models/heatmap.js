import {queryHeatmap} from '../services/heatmap/api';

export default {
  namespace: 'heatmap',

  state: {
    male: { type: 'FeatureCollection', features: []},
    female: {type: 'FeatureCollection', features: []},
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
        male: action.payload.male,
        female: action.payload.female,
      };
    },

    clear(state, action) {
      return {
        male: { type: 'FeatureCollection', features: []},
        female: {type: 'FeatureCollection', features: []},
      }
    },

  },
};
