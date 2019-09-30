import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType, ProductPeriod } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteProductPeriod = async (req, res) => {
  let err;
  let selectedProductPeriod;
  const {
    productPeriodId
  } = req.body;

  // Input validation
    if (productPeriodId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_PERIOD_ID_IS_NOT_PROVIDED);
    return;
  }
  const productPeriodIdValidationError = validateId(productPeriodId);
  if (productPeriodIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productPeriodIdValidationError);
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
  if (user.roleId != 1) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedProductPeriod] = await to(
    ProductPeriod.findOne({where: {id: productPeriodId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedProductPeriod){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedProductPeriod.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product period record is deleted'});
  return;

};

export default deleteProductPeriod;
