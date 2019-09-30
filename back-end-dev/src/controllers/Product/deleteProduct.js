import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType, ProductPeriod, DeliveryPrice, Product } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteProduct = async (req, res) => {
  let err;
  let selectedProductId;
  const {
    productId
  } = req.body;

  // Input validation
    if (productId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DELIVERY_PRICE_ID_IS_NOT_PROVIDED);
    return;
  }
  const productIdValidationError = validateId(productId);
  if (productIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productIdValidationError);
    return;
  }
  //check access
  [err, user] = await to(
    User.findOne({where: {id: req.user.id}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if (user.roleId > 2) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedProductId] = await to(
    Product.findOne({where: {id: productId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedDeliveryPrice){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedProductId.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product record is deleted'});
  return;

};

export default deleteProduct;
