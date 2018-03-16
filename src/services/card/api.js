import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCards(params) {
  return request('/api/real/cards', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
