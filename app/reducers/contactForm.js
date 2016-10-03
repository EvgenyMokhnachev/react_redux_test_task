import {
  CONTACT_CREATE_FAILURE,
  CONTACT_CREATED
} from '../constants';

export default function (contactFormErrors = {}, action) {
  switch (action.type) {

    case CONTACT_CREATE_FAILURE: {
      return contactFormErrors = action.errors;
    }

    case CONTACT_CREATED: {
      return {}
    }

    default:
      return contactFormErrors;
  }
}