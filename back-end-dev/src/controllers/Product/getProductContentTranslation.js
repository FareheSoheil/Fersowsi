import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, DeliveryPrice, LandingPage, ProductContentTranslation } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getProductContentTranslation = async (req, res) => {
  let err;
  let productContentTranslationList;
  
  const { 
    productContentTranslationId
  } = req.body;

  if (productContentTranslationId != null) {
    const productContentTranslationIdValidationError = validateId(productContentTranslationId);
    if (productContentTranslationIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, productContentTranslationIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, productContentTranslationList] = await to(
    ProductContentTranslation.findAll({where: {id: (productContentTranslationId == null )? {gte:1} : productContentTranslationId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(productContentTranslationList);
  return;
  

};

export default getProductContentTranslation;
