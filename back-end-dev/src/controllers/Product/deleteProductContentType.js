import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteProductContentType = async (req, res) => {
  let err;
  let selectedProductContentType;
  const {
    productContentTypeId
  } = req.body;

  // Input validation
  if (productContentTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_CONTENT_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const productContentTypeIdValidationError = validateId(productContentTypeId);
  if (productContentTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productContentTypeIdValidationError);
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
  [err, selectedProductContentType] = await to(
    ProductContentType.findOne({where: {id: productContentTypeId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedProductContentType){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedProductContentType.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product content type record is deleted'});
  return;

};

export default deleteProductContentType;
