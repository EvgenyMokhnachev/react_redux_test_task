import {
  CONTACT_CREATING,
  CONTACT_CREATED,
  CONTACT_CREATE_FAILURE,

  CONTACTS_LOADED,
  CHANGE_FILTER,

  CONTACT_REMOVED
} from '../constants';

export default function (contacts = [], action) {
  switch (action.type) {
    case CONTACTS_LOADED: {
      return action.data.list;
    }

    case CONTACT_CREATING: {
      return contacts;
    }
    case CONTACT_CREATED: {
      let resultContact = action.data.contact;
      contacts.push(resultContact);
      return contacts.map((contact)=> contact);
    }

    case CONTACT_REMOVED: {
      if(action.data.status){
        let removedContactId = action.data._id;
        let result = [];
        contacts.forEach((contact)=> {
          if(contact._id !== removedContactId) result.push(contact);
        });
        return result;
      } else return contacts;
    }

    case CHANGE_FILTER: {
      return contacts.map((contact)=> contact);
    }
    default:
      return contacts;
  }
}