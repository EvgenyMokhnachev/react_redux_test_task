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
      (data) => {
        if(data) {
          if(data.data.status) {
            return store.dispatch({type: success, data: data.data})
          } else {
            return store.dispatch({type: failure, errors: data.data.errors})
          }
        }
      },
      (error) => {
        if(error) return store.dispatch({type: failure, error: error})
      }
    ).catch(
      (error)=>{
        if(error) return store.dispatch({type: failure, error: error})
      }
    );
};

export default middleware;