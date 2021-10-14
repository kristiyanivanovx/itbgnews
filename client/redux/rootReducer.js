import { combineReducers } from 'redux';
import commentReducer from './comment/commentReducer';
import articleReducer from './article/articleReducer';
import infrastructureReducer from './infrastructure/infrastructureReducer';

const rootReducer = combineReducers({
  comment: commentReducer,
  article: articleReducer,
  infrastructure: infrastructureReducer,
});

export default rootReducer;
