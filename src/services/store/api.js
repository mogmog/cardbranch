import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryStores(params) {
  return request('/api/real/stores', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
