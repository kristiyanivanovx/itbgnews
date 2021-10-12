import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  // composeWithDevTools(),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
