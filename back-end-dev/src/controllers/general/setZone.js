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


const setZone = async (req, res) => {
  const { 
      zoneId,
      newName,
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
  const zoneIdSanitized = sanitize(zoneId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let zone;
  
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

    [err, zone] = await to(
      Zone.findOne({where: {id:zoneIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    Zone.name = newNameSanitized;
   
    [err] = await to(zone.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'Zone updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setZone;
