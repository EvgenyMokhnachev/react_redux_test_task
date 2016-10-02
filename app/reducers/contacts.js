import { CONTACTS_LOADED, CHANGE_FILTER } from '../constants';

export default function (contacts = [], action) {
  switch (action.type) {
    case CONTACTS_LOADED: {
      return action.data.data.list;
    }
    case CHANGE_FILTER: {
      return contacts.map((contact)=>{
        return contact;
      });
    }
    default:
      return contacts;
  }
}