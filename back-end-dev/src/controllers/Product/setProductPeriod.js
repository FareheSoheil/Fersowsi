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


const setProductPeriod = async (req, res) => {
  const { 
      productPeriodId,
      newName,
    } = req.body;

  // Input validation,
  if (productPeriodId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_PERIOD_ID_IS_NOT_PROVIDED);
    return;
  }
  const productPeriodIdValidationError = validateId(productPeriodId);
  if (productPeriodIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productPeriodIdValidationError);
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
  const productPeriodIdSanitized = sanitize(productPeriodId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let productPeriod;
  
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

    [err, productPeriod] = await to(
      ProductPeriod.findOne({where: {id:productPeriodIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    ProductPeriod.name = newNameSanitized;
    
    
    [err] = await to(productPeriod.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'product period updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setProductPeriod;
