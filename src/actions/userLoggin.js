/* eslint-disable import/prefer-default-export */

import { USER_LOGIN } from '../constants';

export function userIsLoggedIn({ name, value }) {
  return {
    type: USER_LOGIN,
    payload: {
      name,
      value,
    },
  };
}
