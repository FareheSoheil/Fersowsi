/* eslint-disable no-useless-escape */
import validator from 'validator';
import owasp from 'owasp-password-strength-test';
import joi from 'joi';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { errors as errorList } from './constants/messages';

// TODO: find a better place for maxBTCPerTrade
const maxBTCPerTrade = 2;

export const validateMobileNumber = phoneNumber => {
  
  const number = parsePhoneNumberFromString(phoneNumber);
  let error = '';
  if (number) {
    if (!number.isValid()) {
      error = errorList.PHONE_NUMBER_IS_INCORRECT;
    }
  } else {
    error = errorList.PHONE_NUMBER_NOT_PROVIDED;
  }
  return error;
};


export const validateName = name => {
  const schema = joi
    .string()
    .max(128)
    .min(0);

  const result = joi.validate(name, schema, { presence: 'optional' });
  return result.error ? result.error.details[0].message : '';
};

export const validateBinary = id => {
  const schema = joi
    .number()
    .integer()
    .min(0)
    .max(1);

  const result = joi.validate(id, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validateId = id => {
  const schema = joi
    .number()
    .integer()
    .min(1);

  const result = joi.validate(id, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};


export const validateSearchId = id => {
  const schema = joi
    .number()
    .integer()
    .min(0);

  const result = joi.validate(id, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validateNumber = number => {
  const schema = joi
    .number()
    .integer();

  const result = joi.validate(number, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validateFloatNumber = number => {
  const schema = joi
    .number();

  const result = joi.validate(number, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validateToken = token => {
  let error = '';
  if (token.length === 0) {
    error = errorList.TOKEN_FIELD_IS_EMPTY;
  } else if (!validator.isLength(token, { min: 0, max: 256 })) {
    error = errorList.TOKEN_IS_TOO_LONG;
  }
  return error;
};

export const validateFirstName = name => {
  let error = '';
  if (!validator.isLength(name, { min: 0, max: 128 })) {
    error = errorList.NAME_IS_TOO_LONG;
  }
  return error;
};

export const validateLastName = name => {
  let error = '';
  if (!validator.isLength(name, { min: 0, max: 128 })) {
    error = errorList.NAME_IS_TOO_LONG;
  }
  return error;
};

export const validateContractName = name => {
  let error = '';
  if (!validator.isLength(name, { min: 0, max: 128 })) {
    error = errorList.NAME_IS_TOO_LONG;
  }
  return error;
};

export const validateEmail = email => {
  let error = '';
  if (email.length === 0) {
    error = errorList.EMAIL_FIELD_IS_EMPTY;
  } else if (!validator.isEmail(email)) {
    error = errorList.EMAIL_FORMAT_IS_INCORRECT;
  } else if (!validator.isLength(email, { min: 0, max: 128 })) {
    error = errorList.EMAIL_IS_TOO_LONG;
  }
  return error;
};

export const validatePassword = (password, isRegister) => {
  let error = '';
  const strength = owasp.test(password);
  if (password.length === 0) {
    error = errorList.PASSWORD_FIELD_IS_EMPTY;
  } else if (password.length === 0) {
    error = errorList.PASSWORD_FIELD_IS_EMPTY;
  } else if (isRegister && strength.errors.length > 0) {
    error = strength.errors[0];
  } else if (!validator.isLength(password, { min: 0, max: 128 })) {
    error = errorList.PASSWORD_IS_TOO_LONG;
  }

  return error;
};

export const validatePasswordConfirm = (password, passwordConfirm) => {
  let error = '';
  if (password !== passwordConfirm) {
    error = errorList.PASSWORD_CONFIRMATION_FAILED;
  }
  return error;
};
