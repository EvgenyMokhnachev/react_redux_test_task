import request from './utils/request';

export function getContacts() {
  return request('/api/phones');
}