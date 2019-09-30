import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  user,
  runtime,
  toastr: toastrReducer,
});
