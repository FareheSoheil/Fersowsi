import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job, Claim } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteClaim = async (req, res) => {
  let err;
  let selectedClaim;
  let user;
  const {
    claimId
  } = req.body;

  // Input validation
  if (claimId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CLAIM_ID_IS_NOT_PROVIDED);
    return;
  }
  const claimIdValidationError = validateId(claimId);
  if (claimIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, claimIdValidationError);
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
  if (user.roleId > 2) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedClaim] = await to(
    Claim.findOne({where: {id: claimId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedClaim){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedClaim.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'claim record is deleted'});
  return;

};

export default deleteClaim;
