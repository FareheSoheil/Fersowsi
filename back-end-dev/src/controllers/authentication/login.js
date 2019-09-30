import to from 'await-to-js';
import sequelize from 'sequelize';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User } from '../../models';
import crypto from 'crypto';
import {
  validateEmail,
  validatePassword,
} from '../../validation';
import sanitize from '../../sanitization';


const login = async (req, res) => {
    
  const {
      name, 
      password
    } = req.body;
    const email = name

  // Input validation
  if (!email) {
    resError(res, 500, titles.LOGIN_ERROR, errors.EMAIL_IS_NOT_PROVIDED);
    return;
  }
  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    resError(res, 500, titles.LOGIN_ERROR, emailValidationError);
    return;
  }

  if (!password) {
    resError(res, 500, titles.LOGIN_ERROR, errors.PASSWORD_IS_NOT_PROVIDED);
    return;
  }
  const passwordValidationError = validatePassword(password, false);
  if (passwordValidationError.length > 0) {
    resError(res, 500, titles.LOGIN_ERROR, passwordValidationError);
    return;
  }

  // input sanitization
  const emailSanitized = sanitize(email);
  const passwordSanitized = sanitize(password);

  let err;
  let user;

  // check if the user is signed in before
  if (!req.user) {
    [err, user] = await to(
      User.findOne({
        where: { email: emailSanitized }
      }),
    );
    if (err) {
      resError(res, 500, titles.LOGIN_ERROR, errors.DATABASE_ERROR);
      return;
    }

    // wrong username or password
    if (!user || !User.validPassword(passwordSanitized, user)) {
      resError(res, 500, titles.LOGIN_ERROR, errors.EMAIL_PASSWORD_IS_WRONG);
      return;
    }

    // email is not confirmed yet
    if (!user.emailConfirmed) {
      resError(res, 500, titles.LOGIN_ERROR, errors.PLEASE_CONFIRM_YOUR_EMAIL);
      return;
    }

    // email is not confirmed yet
    if (user.userActivitionStatusId != 2) {
      resError(res, 500, titles.LOGIN_ERROR, errors.YOUR_ACCOUNT_IS_NOT_ACTIVATED_BY_ADMIN);
      return;
    }
    console.log("final login call")
    res.status(200).json({TokenId: User.getToken(user), role:'Admin'});
    return;

  } else {
    // user is signed in before
    resError(res, 500, titles.Login_ERROR, errors.USER_ALREADY_SIGNED_IN);
  }
};

export default login;
