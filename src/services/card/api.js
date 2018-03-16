import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCards(params) {
  return request('/api/cards', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
