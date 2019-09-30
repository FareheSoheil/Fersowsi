import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, DeliveryPrice, Product, ProductContentCategory } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getProductContentCategory = async (req, res) => {
  let err;
  let productContentCategoryList;
  
  const { 
    productContentCategoryId
  } = req.body;

  if (productContentCategoryId != null) {
    const productContentCategoryIdValidationError = validateId(productContentCategoryId);
    if (productContentCategoryIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, productContentCategoryIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, productContentCategoryList] = await to(
    ProductContentCategory.findAll({where: {id: (productContentCategoryId == null )? {gte:1} : productContentCategoryId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(productContentCategoryList);
  return;
  

};

export default getProductContentCategory;
