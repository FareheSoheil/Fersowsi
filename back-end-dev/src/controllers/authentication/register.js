import to from 'await-to-js';
import sanitize from '../../sanitization';
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateContractName,
  validateId,
  validateMobileNumber,
} from '../../validation';

import { resError, resSuccess } from '../../utils';
import sendConfirmationEmail from './sendConfirmationEmail';
import {
  User
} from '../../models';
import { errors, titles } from '../../constants/messages';
import { PhoneNumber } from 'libphonenumber-js';

const register = async (req, res) => {
    
  const {
    firstName,
    lastName,
    contractName,
    email,
    password,
    mobileNumber,
    roleId,
    userSubCategoryId,
    currencyId,
    languageId,
    jobId,
    countryId,
  } = req.body;

  //Input Validation
  if (!email) {
    resError(res, 500, titles.REGISTRATION_ERROR, errors.EMAIL_IS_NOT_PROVIDED);
    return;
  }
  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, emailValidationError);
    return;
  }

  if (!password) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.PASSWORD_IS_NOT_PROVIDED,
    );
    return;
  }
  const passwordValidationError = validatePassword(password, true);
  if (passwordValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, passwordValidationError);
    return;
  }

  if (!firstName) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.FIRST_NAME_IS_NOT_PROVIDED,
    );
    return;
  }
  const firstNameValidationError = validateFirstName(firstName);
  if (firstNameValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, firstNameValidationError);
    return;
  }


  if (!lastName) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.LAST_NAME_IS_NOT_PROVIDED,
    );
    return;
  }
  const lastNameValidationError = validateLastName(lastName);
  if (lastNameValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, lastNameValidationError);
    return;
  }

  if (!contractName) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.CONTRACT_NAME_IS_NOT_PROVIDED,
    );
    return;
  }
  const contractNameValidationError = validateContractName(contractName);
  if (contractNameValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, contractNameValidationError);
    return;
  }

  if (!mobileNumber) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.PHONE_NUMBER_FIELD_IS_EMPTY,
    );
    return;
  }
  const phoneNumberValidationError = validateMobileNumber(mobileNumber);
  if(phoneNumberValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, phoneNumberValidationError);
    return;
  }

  if (!countryId) {
    resError(res, 500, titles.REGISTRATION_ERROR, errors.COUNTRY_ID_IS_EMPTY,);
    return;
  }
  const countryIdValidationError = validateId(countryId);
  if(countryIdValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, countryIdValidationError);
    return;
  }

  if (!roleId) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.ROLE_ID_IS_EMPTY,
    );
    return;
  }
  const roleIdValidationError = validateId(roleId);
  if(roleIdValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, roleIdValidationError);
    return;
  }

  if (!userSubCategoryId) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.USER_SUB_CATEGORY_ID_IS_EMPTY,
    );
    return;
  }
  const userSubCategoryIdValidationError = validateId(userSubCategoryId);
  if(userSubCategoryIdValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, userSubCategoryIdValidationError);
    return;
  }


  if (!currencyId) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.CURRENCY_NOT_SUPPORTED_FOR_PAYMENT,
    );
    return;
  }
  const currencyIdValidationError = validateId(currencyId);
  if(currencyIdValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, currencyIdValidationError);
    return;
  }

  if (!languageId) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.LANGUAGE_ID_IS_EMPTY,
    );
    return;
  }
  const languageIdValidationError = validateId(languageId);
  if(languageIdValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, languageIdValidationError);
    return;
  }

  if (!jobId) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.JOB_ID_IS_EMPTY,
    );
    return;
  }
  const jobIdValidationError = validateId(jobId);
  if(jobIdValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, jobIdValidationError);
    return;
  }

  // input sanitization
  const emailSanitized = sanitize(email);
  const firstNameSanitized = sanitize(firstName);
  const lastNameSanitized = sanitize(lastName);
  const contractNameSanitized = sanitize(contractName);
  const passwordSanitized = sanitize(password);
  const mobileNumberSanitized = sanitize(mobileNumber);
  const roleIdSanitized = sanitize(roleId);
  const userSubCategoryIdSanitized = sanitize(userSubCategoryId);
  const currencyIdSanitized = sanitize(currencyId);
  const languageIdSanitized = sanitize(languageId);
  const jobIdSanitized = sanitize(jobId);
  const countryIdSanitized = sanitize(countryId);


  let err;
  let user;
  let newUser;
  let message='New User is created';

  // if the user is not already logged in
  if (!req.user) {

    [err, user] = await to(User.findOne({ where: { email: emailSanitized } }));
    if (err) {
      resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
      return;
    }

    // user already exists
    if (user) {
      if (user.emailConfirmed === true) {
        resError(
          res,
          500,
          titles.REGISTRATION_ERROR,
          errors.EMAIL_IS_REGISTERED_BEFORE,
        );
        return;
      }
      [err] = await to(user.destroy());
      message = 'User already was registered, but old record is deleted now and new one is inserted';
      if (err) {
        resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
        return;
      }
    }
    
    const dbUser = {
      firstName:firstNameSanitized,
      lastName:lastNameSanitized,
      contractName:contractNameSanitized,
      email:emailSanitized,
      password:User.generateHash(passwordSanitized),
      mobileNumber:mobileNumberSanitized,
      roleId:roleIdSanitized,
      userSubCategoryId:userSubCategoryIdSanitized,
      currencyId:currencyIdSanitized,
      languageId:languageIdSanitized,
      userActivitionStatusId:1,
      jobId:jobIdSanitized,
      countryId: countryIdSanitized
    };
    
    // create new user with dbUser object
    [err, newUser] = await to(
      User.create(dbUser),
    );
    if (err) {
      resError(res, 500, titles.REGISTRATION_ERROR, err.message);
      return;
    }

    // send confirmation email to new user
    sendConfirmationEmail(req, res);

    res.status(200).json({messgae:message});
    return;
  }

  // user is signed in before
  resError(res, 500, titles.REGISTRATION_ERROR, errors.USER_ALREADY_SIGNED_IN);
};

export default register;
