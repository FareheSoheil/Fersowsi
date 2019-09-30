import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Country } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteCountry = async (req, res) => {
  let err;
  let selectedCoutry;
  let user
  const {
    countryId
  } = req.body;

  // Input validation
  if (countryId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.COUNTRY_ID_IS_NOT_PROVIDED);
    return;
  }
  const countryIdValidationError = validateId(countryId);
  if (countryIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, countryIdValidationError);
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
  if (user.roleId != 1) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedCoutry] = await to(
    Country.findOne({where: {id: countryId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedCoutry){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedCoutry.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'country record is deleted'});
  return;

};

export default deleteCountry;
