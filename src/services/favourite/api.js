import { stringify } from 'qs';
import request from '../../utils/request';

export async function addFavourites(params) {
  return request('/api/real/favourites', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function clearFavourites(params) {
  return request('/api/real/favourites/clear', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
