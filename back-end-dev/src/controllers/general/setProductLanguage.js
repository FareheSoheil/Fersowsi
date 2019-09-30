import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Job, ProductLanguage } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setProductLanguage = async (req, res) => {
  const { 
      productLanguageId,
      newName,
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
  const productLanguageIdSanitized = sanitize(productLanguageId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let productLanguage;
  
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

    [err, productLanguage] = await to(
      ProductLanguage.findOne({where: {id:productLanguageIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    ProductLanguage.name = newNameSanitized;
    
    
    [err] = await to(productLanguage.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'Product Language updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setProductLanguage;
