import { queryPageCardMappings, updatePageCardMapping } from '../services/admin/pagecard/api';

export default {
  namespace: 'admin',

  state: {
    cardmappings: [],
  },

  effects: {

    * fetchcardmappings({payload}, { call, put }) {
      const response = yield call(queryPageCardMappings, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * updatecardmapping({payload}, {call, put}) {
      const response = yield call(updatePageCardMapping, payload);
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
        cardmappings: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },
  },
};
