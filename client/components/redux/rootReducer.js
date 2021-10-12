import { combineReducers } from 'redux';
import cakeReducer from './cake/cakeReducer';
import commentReducer from './comment/commentReducer';
import articleReducer from './article/articleReducer';

const rootReducer = combineReducers({
  cake: cakeReducer,
  comment: commentReducer,
  article: articleReducer,
});

export default rootReducer;
