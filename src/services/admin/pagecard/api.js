import { stringify } from 'qs';
import request from '../../../utils/request';

export async function queryPageCardMappings(params) {
  return request('/api/real/admin/cardmappings', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}



export async function updatePageCardMapping(params) {
  return request(`/api/real/admin/cardmappings/${params.id}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
