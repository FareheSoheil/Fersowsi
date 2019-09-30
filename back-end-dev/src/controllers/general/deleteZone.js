import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Zone } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteZone = async (req, res) => {
  let err;
  let selectedZone;
  let user;
  const {
    zoneId
  } = req.body;

  // Input validation
  if (zoneId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ZONE_ID_IS_NOT_PROVIDED);
    return;
  }
  const zoneIdValidationError = validateId(zoneId);
  if (zoneIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, zoneIdValidationError);
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
  if (user.roleId >= 2) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedZone] = await to(
    Zone.findOne({where: {id: zoneId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedZone){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedZone.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'zone record is deleted'});
  return;

};

export default deleteZone;
