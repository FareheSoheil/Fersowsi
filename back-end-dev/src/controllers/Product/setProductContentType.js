import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, ProductContentType } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setProductContentType = async (req, res) => {
  const { 
      productContentTypeId,
      newName,
    } = req.body;

  // Input validation,
  if (productContentTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_CONTENT_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const productContentTypeIdValidationError = validateId(productContentTypeId);
  if (productContentTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productContentTypeIdValidationError);
    return;
  }

  if (newName == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.NAME_IS_NOT_PROVIDED);
    return;
  }
  const newNameValidationError = validateName(newName);
  if (newNameValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newNameValidationError);
    return;
  }

  
  // input sanitization
  const productContentTypeIdSanitized = sanitize(productContentTypeId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let productContent;
  
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

    [err, productContent] = await to(
      ProductContentType.findOne({where: {id:productContentTypeIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    ProductContentType.name = newNameSanitized;
    
    
    [err] = await to(productContent.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'product content type updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setProductContentType;
