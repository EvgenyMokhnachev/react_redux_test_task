import { PROMISE } from './constants';

const middleware = store => next => action => {
  if(action.type !== PROMISE) {
    return next(action);
  }

  const [start, success, failure] = action.actions;

  store.dispatch({
    type: start
  });

  action.promise
    .then(
      (data) => store.dispatch({type: success, data: data}),
      (error => store.dispatch({type: failure, error: error}))
    );
};

export default middleware;