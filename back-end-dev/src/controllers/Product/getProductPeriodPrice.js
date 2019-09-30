import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, DeliveryPrice, LandingPage, ProductPeriodPrice } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getProductPeriodPrice = async (req, res) => {
  let err;
  let productPeriodPriceList;
  
  const { 
    productPeriodPriceId
  } = req.body;

  if (productPeriodPriceId != null) {
    const productPeriodPriceIdValidationError = validateId(productPeriodPriceId);
    if (productPeriodPriceIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, productPeriodPriceIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, productPeriodPriceList] = await to(
    ProductPeriodPrice.findAll({where: {id: (productPeriodPriceId == null )? {gte:1} : productPeriodPriceId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(productPeriodPriceList);
  return;
  

};

export default getProductPeriodPrice;
