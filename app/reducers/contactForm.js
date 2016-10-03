import {
  CONTACT_CREATE_FAILURE,
  CONTACT_CREATED,
  CONTACT_REMOVE_FAILURE
} from '../constants';

export default function (contactForm = {}, action) {
  switch (action.type) {

    case CONTACT_CREATE_FAILURE: {
      return contactForm.errors = action.errors;
    }

    case CONTACT_CREATED: {
      return contactForm.errors = {};
    }

    default:
      return contactForm;
  }
}