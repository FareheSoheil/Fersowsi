import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Job, DeliveryType } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getDeliverytype = async (req, res) => {
  let err;
  let deliveryTypeList;

  const { 
    deliveryTypeId
  } = req.body;

  if (deliveryTypeId != null) {
    const deliveryTypeIdValidationError = validateId(deliveryTypeId);
    if (deliveryTypeIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, deliveryTypeIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, deliveryTypeList] = await to(
    DeliveryType.findAll({where: {id: (deliveryTypeId == null )? {gte:1} : deliveryTypeId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(deliveryTypeList);
  return;
  

};

export default getDeliverytype;
