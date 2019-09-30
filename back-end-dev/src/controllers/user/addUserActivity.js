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
import UserActivity from '../../models/User/UserActivity';


const addUserActivity = async (req, res) => {
  const { 
      newUserId,
      newIp,
      newLocation,
      newBrowser,
      newAction
    } = req.body;

  // Input validation

  if (newUserId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USER_ID_IS_NOT_PROVIDED);
    return;
  }
  const newUserIdValidationError = validateId(newUserId);
  if (newUserIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newUserIdValidationError);
    return;
  }

  if (newIp == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.IP_IS_NOT_PROVIDED);
    return;
  }
  

  if (newLocation == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.LOCATION_IS_NOT_PROVIDED);
    return;
  }
 

  if (newBrowser == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.BROWSER_IS_NOT_PROVIDED);
    return;
  }

  if (newAction == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACTION_IS_NOT_PROVIDED);
    return;
  }
      

  // input sanitization
  const newUserIdSanitized = sanitize(newUserId);
  const newIpSanitized = sanitize(newIp);
  const newLocationSanitized = sanitize(newLocation);
  const newBrowserSanitized = sanitize(newBrowser);
  const newActionSanitized = sanitize(newAction);


  let err;
  let user;
  let userActivity;
  
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
      UserActivity.create(
        {
        userId : newUserIdSanitized,
        ip : newIpSanitized,
        location : newLocationSanitized,
        browser : newBrowserSanitized,
        action : newActionSanitized,
        }
      )
    );
        
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'user Activity is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addUserActivity;
