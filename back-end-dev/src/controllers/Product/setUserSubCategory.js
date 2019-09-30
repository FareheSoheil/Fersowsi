import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Zone } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setUserSubCategory = async (req, res) => {
  const { 
      userSubCategoryId,
      newName,
    } = req.body;

  // Input validation
  if (userSubCategoryId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USER_SUB_CATEGORY_ID_IS_NOT_PROVIDED);
    return;
  }
  const userSubCategoryIdValidationError = validateId(userSubCategoryId);
  if (userSubCategoryIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, userSubCategoryIdValidationError);
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
  const userSubCategoryIdSanitized = sanitize(userSubCategoryId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let userSubCategory;
  
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

    [err, userSubCategory] = await to(
      UserSubCategory.findOne({where: {id:userSubCategoryIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    UserSubCategory.name = newNameSanitized;
   
    [err] = await to(userSubCategory.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'user sub category updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setUserSubCategory;
