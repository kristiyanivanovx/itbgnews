import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  composedEnhancer,
  // composeWithDevTools(applyMiddleware(thunk)),
  // composeWithDevTools(),
  // applyMiddleware(thunk),
);

export default store;
