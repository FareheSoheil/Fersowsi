import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, DeliveryPrice } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getDeliveryPrice = async (req, res) => {
  let err;
  let deliveryPriceList;
  
  const { 
    deliveryPriceId
  } = req.body;

  if (deliveryPriceId != null) {
    const deliveryPriceIdValidationError = validateId(deliveryPriceId);
    if (deliveryPriceIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, deliveryPriceIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, deliveryPriceList] = await to(
    DeliveryPrice.findAll({where: {id: (deliveryPriceId == null )? {gte:1} : deliveryPriceId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(deliveryPriceList);
  return;
  

};

export default getDeliveryPrice;
