import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, AgeGroup } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setAgeGroup = async (req, res) => {
  const { 
      ageGroupId,
      newName,
    } = req.body;

  // Input validation
  if (ageGroupId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.AGE_GROUP_ID_IS_NOT_PROVIDED);
    return;
  }
  const ageGroupIdValidationError = validateId(ageGroupId);
  if (ageGroupIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, ageGroupIdValidationError);
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
  const ageGroupIdSanitized = sanitize(ageGroupId);
  const newNameSanitized = sanitize(newName);
 
  let err;
  let user;
  let ageGroup;
  
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

    [err, ageGroup] = await to(
      AgeGroup.findOne({where: {id:ageGroupIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    ageGroup.name = newNameSanitized;
        
    [err] = await to(ageGroup.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'ageGroup updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setAgeGroup;
