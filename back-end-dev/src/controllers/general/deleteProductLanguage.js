import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Country, ProductLanguage } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteProductLanguage = async (req, res) => {
  let err;
  let selectedProductLanguage;
  const {
    productLanguageId
  } = req.body;

  // Input validation
  if (productLanguageId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_LANGUAGE_ID_IS_NOT_PROVIDED);
    return;
  }
  const productLanguageIdValidationError = validateId(productLanguageId);
  if (productLanguageIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productLanguageIdValidationError);
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
  [err, selectedProductLanguage] = await to(
    ProductLanguage.findOne({where: {id: productLanguageId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedProductLanguage){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedProductLanguage.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product language record is deleted'});
  return;

};

export default deleteProductLanguage;
