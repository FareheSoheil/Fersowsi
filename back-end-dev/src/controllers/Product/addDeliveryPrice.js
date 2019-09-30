import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, DeliveryPrice } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addDeliveryPrice = async (req, res) => {
  const { 
      deliveryPriceId,
      newProductPeriodPriceId,
      newZoneId,
      newDeliveryTypeId,
      newDeliveryPrice
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

  if (newProductPeriodPriceId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_PERIOD_PRICE_IS_NOT_PROVIDED);
    return;
  }
  const newProductPeriodPriceIdValidationError = validateId(newProductPeriodPriceId);
  if (newProductPeriodPriceIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newProductPeriodPriceIdValidationError);
    return;
  }

  if (newZoneId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ZONE_ID_IS_NOT_PROVIDED);
    return;
  }
  const newZoneIdValidationError = validateName(newZoneId);
  if (newZoneIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newZoneIdValidationError);
    return;
  }

  if (newDeliveryTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DELIVERY_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const newDeliveryTypeIdValidationError = validateFloatNumber(newDeliveryTypeId);
  if (newDeliveryTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newDeliveryTypeIdValidationError);
    return;
  }

  if (newDeliveryPrice == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DELIVERY_PRICE_IS_NOT_PROVIDED);
    return;
  }
  const newDeliveryPriceValidationError = validateBinary(newDeliveryPrice);
  if (newDeliveryPriceValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newDeliveryPriceValidationError);
    return;
  }


  // input sanitization
  const deliveryPriceIdSanitized = sanitize(deliveryPriceId);
  const newProductPeriodPriceIdSanitized = sanitize(newProductPeriodPriceId);
  const newZoneIdSanitized = sanitize(newZoneId);
  const newDeliveryTypeIdSanitized = sanitize(newDeliveryTypeId);
  const newDeliveryPriceSanitized = sanitize(newDeliveryPrice);

  let err;
  let user;
  let deliveryPrice;
  
  if (req.user) {
    [err, user] = await to(
      User.findOne({
        where: { id: req.user.id }
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }
    
  
    // email is not confirmed yet
    if (user.roleId != 1) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
      return;
    }

    [err] = await to(
      DeliveryPrice.create(
        {

      deliveryPriceId:deliveryPriceIdSanitized,    
      productPeriodPriceId : newProductPeriodPriceIdSanitized,
      zoneId : newZoneIdSanitized,
      deliveryTypeId : newDeliveryTypeIdSanitized,
      deliveryPrice : newDeliveryPriceSanitized,
        }
      )
    )
        

    res.status(200).json({message: 'delivery price is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addDeliveryPrice;
