import { combineReducers } from 'redux';
import repo from './repoReducer';

const rootReducer = combineReducers({
  repo
});

export default rootReducer;
