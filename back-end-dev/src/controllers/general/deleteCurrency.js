import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteCurrency = async (req, res) => {
  let err;
  let selectedCurrency;
  const {
    currencyId
  } = req.body;

  // Input validation
  if (currencyId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CURRENCY_ID_IS_NOT_PROVIDED);
    return;
  }
  const currencyIdValidationError = validateId(currencyId);
  if (currencyIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, currencyIdValidationError);
    return;
  }

  // check if the user is signed in before
  [err, selectedCurrency] = await to(
    Currency.findOne({where: {id: currencyId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedCurrency){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedCurrency.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'Currency record is deleted'});
  return;

};

export default deleteCurrency;
