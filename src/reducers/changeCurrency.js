import { CHANGE_CURRECNY } from '../constants';

export default function runtime(state = {}, action) {
  switch (action.type) {
    case CHANGE_CURRECNY:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
