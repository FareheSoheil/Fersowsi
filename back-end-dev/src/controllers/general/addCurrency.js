import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addCurrency = async (req, res) => {
  const { 
      newName,
      newAbbr,
      newUsdRatio,
      newIsAutomatic
    } = req.body;

  // Input validation
  if (newName == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.NAME_IS_NOT_PROVIDED);
    return;
  }
  const newNameValidationError = validateName(newName);
  if (newNameValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newNameValidationError);
    return;
  }

  if (newAbbr == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.NAME_IS_NOT_PROVIDED);
    return;
  }
  const newAbbrValidationError = validateName(newAbbr);
  if (newAbbrValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newAbbrValidationError);
    return;
  }

  if (newUsdRatio == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USD_RATIO_IS_NOT_PROVIDED);
    return;
  }
  const newUsdRatioValidationError = validateFloatNumber(newUsdRatio);
  if (newUsdRatioValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newUsdRatioValidationError);
    return;
  }

  if (newIsAutomatic == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USD_RATIO_IS_NOT_PROVIDED);
    return;
  }
  const newIsAutomaticValidationError = validateBinary(newIsAutomatic);
  if (newIsAutomaticValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newIsAutomaticValidationError);
    return;
  }

  // input sanitization
  const newNameSanitized = sanitize(newName);
  const newAbbrSanitized = sanitize(newAbbr);
  const newUsdRatioSanitized = sanitize(newUsdRatio);
  const newIsAutomaticSanitized = sanitize(newIsAutomatic);

  let err;
  let user;
  let currency;
  
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
      Currency.create(
        {
          name: newNameSanitized,
          abbr: newAbbrSanitized,
          usdRatio: newUsdRatioSanitized,
          isAutomatic: newIsAutomaticSanitized
        }
      )
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'Currency is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addCurrency;
