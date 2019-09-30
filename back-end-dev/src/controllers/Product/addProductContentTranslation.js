import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User,  ProductContentTranslation } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addProductContentTranslation = async (req, res) => {
  const { 
      newproductId,
      newLanguageId,
      newTitle,
      newDescription

    } = req.body;

  // Input validation
  
  if (newproductId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_ID_IS_NOT_PROVIDED);
    return;
  }
  const newproductIdValidationError = validateId(newproductId);
  if (newproductIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newproductIdValidationError);
    return;
  }

  if (newLanguageId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.LANGUAGE_ID_IS_NOT_PROVIDED);
    return;
  }
  const newLanguageIdValidationError = validateId(newLanguageId);
  if (newLanguageIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newLanguageIdValidationError);
    return;
  }


  if (newTitle == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.TITLE_IS_NOT_PROVIDED);
    return;
  }
  const newTitleValidationError = validateName(newTitle);
  if (newTitleValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newTitleValidationError);
    return;
  }
  
  if (newDescription == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DESCRIPTION_IS_NOT_PROVIDED);
    return;
  }
  const newDescriptionValidationError = validateName(newDescription);
  if (newDescriptionValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newDescriptionValidationError);
    return;
  }


  // input sanitization
  const newproductIdSanitized = sanitize(newproductId);
  const newLanguageIdSanitized = sanitize(newLanguageId);
  const newTitleSanitized = sanitize(newTitle);
  const newDescriptionSanitized = sanitize(newDescription);

  let err;
  let user;
  
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
      ProductContentTranslation.create(
        {

          productId : newproductIdSanitized,
          languageId : newLanguageIdSanitized,
          title : newTitleSanitized,
          description : newDescriptionSanitized,
        }
      )
    );

    
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'product content translation is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addProductContentTranslation;
