import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency } from '../../models';
import {
  validateId,
  validateNumber,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setCountry = async (req, res) => {
  const { 
      countryId,
      newNumcode,
      newPhonecode,
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

  if (newNumcode == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.NUMCODE_IS_NOT_PROVIDED);
    return;
  }
  const newNumcodeValidationError = validateNumber(newNumcode);
  if (newNumcodeValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newNumcodeValidationError);
    return;
  }

  if (newPhonecode == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PHONE_CODE_IS_NOT_PROVIDED);
    return;
  }
  const newPhonecodeValidationError = validateNumber(newPhonecode);
  if (newPhonecodeValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newPhonecodeValidationError);
    return;
  }



  // input sanitization
  const countryIddSanitized = sanitize(countryId);
  const newNumcodeSanitized = sanitize(newNumcode);
  const newPhonecodeSanitized = sanitize(newPhonecode);


  let err;
  let user;
  let country;
  
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

    [err, country] = await to(
      Country.findOne({where: {id:countryIddSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    currency.numcode = newNumcodeSanitized;
    currency.Phonecode = newPhonecodeSanitized;
      
    [err] = await to(country.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'country updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setCountry;
