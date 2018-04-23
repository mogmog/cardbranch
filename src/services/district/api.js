import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryDistrict(params) {
  return request('/api/real/district', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
