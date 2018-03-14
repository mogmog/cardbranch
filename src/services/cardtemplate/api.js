import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryTemplates() {
  return request('/api/cardtemplates/list');
}
