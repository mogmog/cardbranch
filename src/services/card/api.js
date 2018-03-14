import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryAlerts() {
  return request('/api/cards/alerts');
}
