import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, ContactUs } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary,
  validateEmail,
  validateNumber
} from '../../validation';
import sanitize from '../../sanitization';


const addContactUs = async (req, res) => {
  const { 
      newFirstName,
      newLastName,
      newPhoneNumber,
      newCountryId,
      newEmail
  } = req.body;

// Input validation


if (newFirstName == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.FIRST_NAME_IS_NOT_PROVIDED);
  return;
}
const newFirstNameValidationError = validateName(newFirstName);
if (newFirstNameValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newFirstNameValidationError);
  return;
}


if (newLastName == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.LAST_NAME_IS_NOT_PROVIDED);
  return;
}
const newLastNameValidationError = validateName(newLastName);
if (newLastNameValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newLastNameValidationError);
  return;
}

if (newPhoneNumber == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.PHONE_NUMBER_NOT_PROVIDED);
  return;
}

const newPhoneNumberValidationError = validateNumber(newPhoneNumber);
if (newPhoneNumberValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newPhoneNumberValidationError);
  return;
}

if (newCountryId == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.COUNTRY_ID_IS_NOT_PROVIDED);
  return;
}

const newCountryIdValidationError = validateId(newCountryId);
if (newCountryIdValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newCountryIdValidationError);
  return;
}

if (newEmail == null) {
  resError(res, 500, titles.FETCH_STATE_ERROR, errors.EMAIL_IS_NOT_PROVIDED);
  return;
}

const newEmailValidationError = validateEmail(newEmail);
if (newEmailValidationError.length > 0) {
  resError(res, 500, titles.FETCH_STATE_ERROR, newEmailValidationError);
  return;
}

// input sanitization
const newFirstNameSanitized = sanitize(newFirstName);
const newLastNameSanitized = sanitize(newLastName);
const newPhoneNumberSanitized = sanitize(newPhoneNumber);
const newCountryIdSanitized = sanitize(newCountryId);
const newEmailSanitized = sanitize(newEmail);

let err;
let user;

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
      ContactUs.create(
        {
          firstName : newFirstNameSanitized,
          lastName : newLastNameSanitized,
          phoneNumber : newPhoneNumberSanitized,
          countryId : newCountryIdSanitized,
          email : newEmailSanitized,

        }
      )
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'ContactUs is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addContactUs;
