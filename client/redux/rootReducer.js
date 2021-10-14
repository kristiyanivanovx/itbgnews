import { combineReducers } from 'redux';
import commentReducer from './comment/commentReducer';
import articleReducer from './article/articleReducer';
import infrastructureReducer from './infrastructure/infrastructureReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  comment: commentReducer,
  article: articleReducer,
  infrastructure: infrastructureReducer,
});

export default rootReducer;
