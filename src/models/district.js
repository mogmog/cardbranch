import { queryDistrict } from '../services/district/api';

export default {
  namespace: 'district',

  state: {
    geojson: null,
  },

  effects: {

    *fetch({payload}, {call, put}) {
      const response = yield call(queryDistrict, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {

      action.payload.features.map(x => {x.properties.frequency = Math.floor(Math.random() * 20) + 1  ; return x})

      return {
        ...state,
        geojson: action.payload,
      };
    },

  },
};
