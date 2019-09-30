import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, User } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';
import UserActivity from '../../models/User/UserActivity';
import { UsageRecordList } from 'twilio/lib/rest/wireless/v1/sim/usageRecord';

const getUserActivity = async (req, res) => {
  let err;
  let userActivityList;
  
  const { 
    userActivityId
  } = req.body;

  if (userActivityId != null) {
    const userActivityIdValidationError = validateId(userActivityId);
    if (userActivityIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, userActivityIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, userActivityList] = await to(
    UserActivity.findAll({where: {id: (userActivityId == null )? {gte:1} : userActivityId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(UsageRecordList);
  return;
  

};

export default getUserActivity;
