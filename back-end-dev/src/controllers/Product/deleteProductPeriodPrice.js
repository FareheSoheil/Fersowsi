import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType, ProductPeriod, DeliveryPrice, Product, ProductPeriodPrice } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteProductPeriodPrice = async (req, res) => {
  let err;
  let selectedProductperiodPriceId;
  const {
    productPeriodPriceId
  } = req.body;

  // Input validation
    if (productPeriodPriceId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DELIVERY_PRICE_ID_IS_NOT_PROVIDED);
    return;
  }
  const productPeriodPriceIdValidationError = validateId(productPeriodPriceId);
  if (productPeriodPriceIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productPeriodPriceIdValidationError);
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
  if (user.roleId >= 3) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedProductperiodPriceId] = await to(
    ProductPeriodPrice.findOne({where: {id: productPeriodPriceId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedProductperiodPriceId){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedProductperiodPriceId.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product period price record is deleted'});
  return;

};

export default deleteProductPeriodPrice;
