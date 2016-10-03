import {
  getContacts,
  setContact,
  rmContact
} from './api';
import {
  CONTACT_CREATING,
  CONTACT_CREATED,
  CONTACT_CREATE_FAILURE,
  CHANGE_FILTER,
  PROMISE,
  CONTACTS_LOADING,
  CONTACTS_LOADED,
  CONTACTS_LOAD_FAILURE,

  CONTACT_REMOVING,
  CONTACT_REMOVED,
  CONTACT_REMOVE_FAILURE
} from './constants';

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

export function createContact(name, phone) {
  return {
    type: PROMISE,
    actions: [CONTACT_CREATING, CONTACT_CREATED, CONTACT_CREATE_FAILURE],
    promise: setContact(name, phone)
  }
}

export function removeContact(contact) {
  return {
    type: PROMISE,
    actions: [CONTACT_REMOVING, CONTACT_REMOVED, CONTACT_REMOVE_FAILURE],
    promise: rmContact(contact)
  }
}