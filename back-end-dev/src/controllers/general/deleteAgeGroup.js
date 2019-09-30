import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, AgeGroup } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';
import { Record } from 'immutable';

const deleteAgeGroup = async (req, res) => {
  let err;
  let selectedAgeGroup;
  let user;


  const {
    ageGroupId
  } = req.body;

  // Input validation
  if (ageGroupId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.AGE_GROUP_IS_NOT_PROVIDED);
    return;
  }
  const ageGroupIdValidationError = validateId(ageGroupId);
  if (ageGroupIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, ageGroupIdValidationError);
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
  if (user.roleId <= 1) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }


  // check if the user is signed in before
  [err, selectedAgeGroup] = await to(
    AgeGroup.findOne({where: {id: ageGroupId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedAgeGroup){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }


  [err] = await to (selectedAgeGroup.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'ageGroup record is deleted'});
  return;

};

export default deleteAgeGroup;
