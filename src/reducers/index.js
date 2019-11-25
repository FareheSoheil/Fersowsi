import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import changeCurrency from './changeCurrency';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { i18nReducer } from 'react-redux-i18n';
export default combineReducers({
  user,
  runtime,
  changeCurrency,
  toastr: toastrReducer,
  i18n: i18nReducer,
});
