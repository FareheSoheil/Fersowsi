import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getAgeGroup = async (req, res) => {
  let err;
  let ageGroupList;
  
  const { 
    ageGroupId
  } = req.body;

  if (ageGroupId != null) {
    const ageGroupIdValidationError = validateId(ageGroupId);
    if (ageGroupIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, ageGroupIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, ageGroupList] = await to(
    AgeGroup.findAll({where: {id: (ageGroupId == null )? {gte:1} : ageGroupId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(ageGroupList);
  return;
  

};

export default getAgeGroup;
