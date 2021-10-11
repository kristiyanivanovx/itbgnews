import { combineReducers } from 'redux';
import cakeReducer from './cake/cakeReducer';
import commentReducer from './comment/commentReducer';

const rootReducer = combineReducers({
  cake: cakeReducer,
  comment: commentReducer,
});

export default rootReducer;
