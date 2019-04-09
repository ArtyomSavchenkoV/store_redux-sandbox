import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';

/**
 * Use string as action, and dispatch it.
 * 
 * @param of external function {} get Store. In this example not use.
 * @param of next function {function} dispatch.
 * @param of internal function {object or string} action object or
 * 		reduce action string
 * 
 * @return dispatched action
 */
const stringMiddleware = (/*store*/) => (dispatch) => (action) => {
    if(typeof action === 'string') {
        return dispatch({
            type: action
        });
    }
    return dispatch(action)
};

/**
 * Insert "action type" string into the log.
 */
const logMiddleware = (/*store*/) => (dispatch) => (action) => {
    console.log(action.type/*, store.getState()*/);
    return dispatch(action);
};

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        stringMiddleware,
        logMiddleware
    ));

export default store;
