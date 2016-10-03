import { createStore, combineReducers, applyMiddleware } from 'redux';
import promisesMiddleware from './promises';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(promisesMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer, {
  contacts: [],
  filter: {
    phone: '',
    name: ''
  },
  contactForm: {
    errors: {}
  }
});

export default store;
