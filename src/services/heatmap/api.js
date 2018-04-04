import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryHeatmap(params) {

  return request('/api/heatmap', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
