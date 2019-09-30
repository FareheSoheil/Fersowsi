import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, ContactUs } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary,
  validateNumber
} from '../../validation';
import sanitize from '../../sanitization';


const setContactUs = async (req, res) => {
  const { 
    contactUsId,
    newFirstName,
    newLastName,
    newPhoneNumber,
    newCountryId,
    newEmail
    } = req.body;

  // Input validation
  
  if (contactUsId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CONTACT_US_ID_IS_NOT_PROVIDED);
    return;
  }
  const contactUsIdValidationError = validateId(contactUsId);
  if (contactUsIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, contactUsIdValidationError);
    return;
  }

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
  const contactUsNameSanitized = sanitize(contactUsId);
  const newFirstNameSanitized = sanitize(newFirstName);
  const newLastNameSanitized = sanitize(newLastName);
  const newPhoneNumberSanitized = sanitize(newPhoneNumber);
  const newCountryIdSanitized = sanitize(newCountryId);
  const newEmailSanitized = sanitize(newEmail);
  
  let err;
  let user;
  let contactUs;
  
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

    [err, contactUs] = await to(
      ContactUs.findOne({where: {id:commentIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    ContactUs.firstName = newFirstNameSanitized;
    ContactUs.lastName = newLastNameSanitized;
    ContactUs.phoneNumber = newPhoneNumberSanitized;
    ContactUs.countryId = newCountryIdSanitized;
    ContactUs.email = newEmailSanitized;

    [err] = await to(contactUs.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'ContactUs updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  };

export default setContactUs;
