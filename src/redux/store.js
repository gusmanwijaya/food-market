import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {
  globalReducer,
  photoReducer,
  signUpReducer,
  homeReducer,
  orderReducer,
} from './reducers';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  globalReducer,
  photoReducer,
  signUpReducer,
  homeReducer,
  orderReducer,
});

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk)),
);

export default store;
