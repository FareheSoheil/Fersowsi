import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Basket } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addBasket = async (req, res) => {
  const { 
    newUserId,
    newActionUserId,
    newProductId,

  } = req.body;

// Input validation

if (newUserId == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.USER_ID_IS_NOT_PROVIDED);
  return;
}
const newUserIdValidationError = validateId(newUserId);
if (newUserIdValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newUserIdValidationError);
  return;
}

if (newActionUserId == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACTION_USER_ID_IS_NOT_PROVIDED);
  return;
}
const newActionUserIdValidationError = validateId(newActionUserId);
if (newActionUserIdValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newActionUserIdValidationError);
  return;
}


if (newProductId == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_ID_IS_NOT_PROVIDED);
  return;
}
const newProductIdValidationError = validateId(newProductId);
if (newProductIdValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newProductIdValidationError);
  return;
}


// input sanitization
  const newUserIdSanitized = sanitize(newUserId);
  const newActionUserIdSanitized = sanitize(newActionUserId);
  const newProductIdSanitized = sanitize(newProductId);


  let err;
  let user;
  let basket;

  if (req.user) {
    [err, user] = await to(
      User.findOne({
        where: { id: req.user.id }
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }
  
    // email is not confirmed yet
    if (user.roleId != 1) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
      return;
    }


    [err] = await to(
      Basket.create(
        {
          userId : newUserIdSanitized,
          actionUserId : newActionUserIdSanitized,
          productId : newProductIdSanitized,
 
        }
      )
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'basket is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addBasket;
