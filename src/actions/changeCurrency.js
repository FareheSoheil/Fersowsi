/* eslint-disable import/prefer-default-export */

import { CHANGE_CURRECNY } from '../constants';

export function changeCurrency({ name, value }) {
  return {
    type: CHANGE_CURRECNY,
    payload: {
      name,
      value,
    },
  };
}
