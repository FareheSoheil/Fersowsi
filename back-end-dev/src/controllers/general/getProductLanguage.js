import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Job } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getProductLanguage = async (req, res) => {
  let err;
  let productLanguageList;

  const { 
    productLanguageId
  } = req.body;

  if (productLanguageId != null) {
    const productLanguageIdValidationError = validateId(productLanguageId);
    if (productLanguageIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, productLanguageIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, productLanguageList] = await to(
    ProductLanguage.findAll({where: {id: (productLanguageId == null )? {gte:1} : productLanguageId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(productLanguageList);
  return;
  

};

export default getProductLanguage;
