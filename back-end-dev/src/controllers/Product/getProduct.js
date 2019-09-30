import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, DeliveryPrice, Product } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getProduct = async (req, res) => {
  let err;
  let productList;
  
  const { 
    productId
  } = req.body;

  if (productId != null) {
    const productIdValidationError = validateId(productId);
    if (productIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, productIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, productList] = await to(
    Product.findAll({where: {id: (productId == null )? {gte:1} : productId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(productList);
  return;
  

};

export default getProduct;
