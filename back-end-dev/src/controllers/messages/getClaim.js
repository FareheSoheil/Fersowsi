import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {  Claim } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getClaim = async (req, res) => {
  let err;
  let claimlist;

  const { 
    claimId
  } = req.body;

  if (claimId != null) {
    const claimIdValidationError = validateId(claimId);
    if (claimIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, claimIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, claimlist] = await to(
    Claim.findAll({where: {id: (claimId == null )? {gte:1} : claimId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(claimlist);
  return;
  

};

export default getClaim;
