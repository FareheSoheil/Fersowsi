import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, ProductContentType, SingleProductType } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setSingleProductType = async (req, res) => {
  const { 
      singleProductTypeId,
      newName,
    } = req.body;

  // Input validation,
  if (singleProductTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.SINGLE_PRODUCT_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const singleProductTypeIdValidationError = validateId(singleProductTypeId);
  if (singleProductTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, singleProductTypeIdValidationError);
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
  const singleProductTypeSanitized = sanitize(singleProductType);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let singleProduct;
  
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

    [err, singleProduct] = await to(
      SingleProductType.findOne({where: {id:singleProductTypeSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    SingleProductType.name = newNameSanitized;
    
    
    [err] = await to(singleProduct.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'single Product type updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setSingleProductType;
