import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, DeliveryType } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteDeliveryType = async (req, res) => {
  let err;
  let selectedDeliveryType;
  const {
    deliveryTypeId
  } = req.body;

  // Input validation
  if (deliveryTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DELIVERY_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const deliveryTypeIdValidationError = validateId(deliveryTypeId);
  if (deliveryTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, deliveryTypeIdValidationError);
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
  [err, selectedDeliveryType] = await to(
    DeliveryType.findOne({where: {id: deliveryTypeId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedDeliveryType){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedDeliveryType.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'elivery type record is deleted'});
  return;

};

export default deleteDeliveryType;
