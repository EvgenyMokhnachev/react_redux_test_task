import { CHANGE_FILTER } from '../constants';

export default function (filter = {}, action) {
  switch (action.type) {
    case CHANGE_FILTER: {
      return Object.assign(filter, action.filter);
    }
    default:
      return filter;
  }
}