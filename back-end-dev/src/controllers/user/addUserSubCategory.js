import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, AgeGroup, UserSubCategory } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addUserSubCategory = async (req, res) => {
  const { 
      newName,
    } = req.body;

  // Input validation

  if (newName == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.NAME_IS_NOT_PROVIDED);
    return;
  }
  const newNameValidationError = validateName(newName);
  if (newNameValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newNameValidationError);
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

  

  // input sanitization
  const newNameSanitized = sanitize(newName);
 
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
      UserSubCategory.create(
        {
          name: newNameSanitized,
        }
      )
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'user sub category is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addUserSubCategory;
