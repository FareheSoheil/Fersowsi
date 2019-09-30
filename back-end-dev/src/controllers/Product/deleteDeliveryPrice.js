import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType, ProductPeriod, DeliveryPrice } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteDeliveryPrice = async (req, res) => {
  let err;
  let selectedDeliveryPrice;
  const {
    deliveryPriceId
  } = req.body;

  // Input validation
    if (deliveryPriceId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DELIVERY_PRICE_ID_IS_NOT_PROVIDED);
    return;
  }
  const deliveryPriceIdValidationError = validateId(deliveryPriceId);
  if (deliveryPriceIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, deliveryPriceIdValidationError);
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
  if (user.roleId != 1) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedDeliveryPrice] = await to(
    DeliveryPrice.findOne({where: {id: deliveryPriceId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedDeliveryPrice){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedDeliveryPrice.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product period record is deleted'});
  return;

};

export default deleteDeliveryPrice;
