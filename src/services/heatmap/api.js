import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryHeatmap(params) {

  return request('/api/real/heatmap', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
