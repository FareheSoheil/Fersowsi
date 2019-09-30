import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType, ProductPeriod, SingleProductType } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteSingleProductType = async (req, res) => {
  let err;
  let selectedSingleProductType;
  const {
    singleProductTypeId
  } = req.body;

  // Input validation
    if (singleProductTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.SINGLE_PRODUCT_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const singleProductTypeIdValidationError = validateId(singleProductTypeId);
  if (singleProductTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, singleProductTypeIdValidationError);
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
  [err, selectedSingleProductType] = await to(
    SingleProductType.findOne({where: {id: singleProductTypeId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedSingleProductType){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedSingleProductType.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'single period type record is deleted'});
  return;

};

export default deleteSingleProductType;
