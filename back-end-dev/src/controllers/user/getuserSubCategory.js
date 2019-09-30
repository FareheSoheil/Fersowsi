import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {  UserSubCategory } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getuserSubCategory = async (req, res) => {
  let err;
  let userSubCategoryList;

  const { 
    userSubCategoryId
  } = req.body;

  if (userSubCategoryId != null) {
    const userSubCategoryIdValidationError = validateId(userSubCategoryId);
    if (userSubCategoryIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, userSubCategoryIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, userSubCategoryList] = await to(
    UserSubCategory.findAll({where: {id: (userSubCategoryId == null )? {gte:1} : userSubCategoryId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(userSubCategoryList);
  return;
  

};

export default getuserSubCategory;
