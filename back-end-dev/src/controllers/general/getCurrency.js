import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getCurrency = async (req, res) => {
  let err;
  let currencyList;
  
  const { 
    currencyId
  } = req.body;

  if (currencyId != null) {
    const currencyIdValidationError = validateId(currencyId);
    if (currencyIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, currencyIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, currencyList] = await to(
    Currency.findAll({where: {id: (currencyId == null )? {gte:1} : currencyId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(currencyList);
  return;
  

};

export default getCurrency;
