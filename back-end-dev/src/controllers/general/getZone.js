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


const getZone = async (req, res) => {
  let err;
  let zoneList;

  const { 
    zoneId
  } = req.body;

  if (zoneId != null) {
    const zoneIdValidationError = validateId(zoneId);
    if (zoneIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, zoneIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, zoneList] = await to(
    Zone.findAll({where: {id: (zoneId == null )? {gte:1} : zoneId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(zoneList);
  return;
  

};

export default getZone;
