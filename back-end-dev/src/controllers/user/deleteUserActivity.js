import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';
import UserActivity from '../../models/User/UserActivity';

const deleteUserActivity = async (req, res) => {
  let err;
  let selectedUserActivity;
  const {
    userActivityId
  } = req.body;

  // Input validation
  if (userActivityId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USER_ACTIVITY_ID_IS_NOT_PROVIDED);
    return;
  }
  const userActivityIdValidationError = validateId(userActivityId);
  if (userActivityIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, userActivityIdValidationError);
    return;
  }

  // check if the user is signed in before
  [err, selectedUserActivity] = await to(
    UserActivity.findOne({where: {id: userActivityId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedUserActivity){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedUserActivity.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'User Activity record is deleted'});
  return;

};

export default deleteUserActivity;
