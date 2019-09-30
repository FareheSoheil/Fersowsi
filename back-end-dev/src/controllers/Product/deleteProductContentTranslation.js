import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType, ProductPeriod, ProductContentTranslation } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteProductContentTranslation = async (req, res) => {
  let err;
  let selectedProductContentTranslation;
  const {
    productContentTranslationId
  } = req.body;

  // Input validation
    if (productContentTranslationId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_PERIOD_ID_IS_NOT_PROVIDED);
    return;
  }
  const productContentTranslationIdValidationError = validateId(productContentTranslationId);
  if (productContentTranslationIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productContentTranslationIdValidationError);
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
  [err, selectedProductContentTranslation] = await to(
    ProductContentTranslation.findOne({where: {id: productContentTranslationId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedProductContentTranslation){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedProductContentTranslation.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product content translation record is deleted'});
  return;

};

export default deleteProductContentTranslation;
