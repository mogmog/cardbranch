import { stringify } from 'qs';
import request from '../../../utils/request';

export async function queryPageCardMappings(params) {
  return request('/api/real/admin/pagecard', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
