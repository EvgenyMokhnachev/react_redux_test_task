import { getContacts } from './api';
import store from './state';
import { CHANGE_FILTER, PROMISE, CONTACTS_LOADING, CONTACTS_LOADED, CONTACTS_LOAD_FAILURE } from './constants';

export function loadContacts() {
  return {
    type: PROMISE,
    actions: [CONTACTS_LOADING, CONTACTS_LOADED, CONTACTS_LOAD_FAILURE],
    promise: getContacts()
  }
}

export function changeFilter(filter) {
  return {
    type: CHANGE_FILTER,
    filter: filter
  }
}