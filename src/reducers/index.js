import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { i18nReducer } from 'react-redux-i18n';
export default combineReducers({
  user,
  runtime,
  toastr: toastrReducer,
  i18n: i18nReducer,
});
