import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job, Claim, Basket } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deletebasket = async (req, res) => {
  let err;
  let selectedBasket;
  let user;
  const {
    basketId
  } = req.body;

  // Input validation
  if (basketId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.BASKET_ID_IS_NOT_PROVIDED);
    return;
  }
  const basketIdValidationError = validateId(basketId);
  if (basketIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, basketIdValidationError);
    return;
  }

  //check access
  [err, user] = await to(
    User.findOne({where: {id: req.user.id}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if (user.roleId > 2) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedBasket] = await to(
    Basket.findOne({where: {id: basketId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedBasket){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedBasket.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'basket record is deleted'});
  return;

};

export default deletebasket;
