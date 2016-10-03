import {
  CONTACT_CREATING,
  CONTACT_CREATED,
  CONTACT_CREATE_FAILURE,

  CONTACTS_LOADED,
  CHANGE_FILTER,

  CONTACT_REMOVED
} from '../constants';

export default function (contacts = [], action) {

  const comparator = (a,b) =>{
    const nameA = a.name.toLowerCase(),
      nameB = b.name.toLowerCase();
    return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
  };

  switch (action.type) {

    case CONTACTS_LOADED: {
      return action.data.list.sort(comparator);
    }

    case CONTACT_CREATING: {
      return contacts;
    }
    case CONTACT_CREATED: {
      contacts.push(action.data.contact);
      return contacts.sort(comparator);
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