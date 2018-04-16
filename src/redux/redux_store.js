import statechange from './reducer/reducers'
// import {createStore} from 'redux';

// let store = createStore(statechange);
// export default store;
import thunkMiddleware from 'redux-thunk';


import { createStore, combineReducers, applyMiddleware} from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  statechange
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer, applyMiddleware(
        thunkMiddleware,
    ));

export default store;
