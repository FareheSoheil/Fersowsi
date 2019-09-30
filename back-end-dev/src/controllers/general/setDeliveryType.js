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


const setDeliveryType = async (req, res) => {
  const { 
      deliveryTypeId,
      newName,
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

  if (newName == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.NAME_IS_NOT_PROVIDED);
    return;
  }
  const newNameValidationError = validateName(newName);
  if (newNameValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newNameValidationError);
    return;
  }


  // input sanitization
  const deliveryTypeIdSanitized= sanitize(deliveryTypeId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let deliveryType;
  
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

    [err, deliveryType] = await to(
      DeliveryType.findOne({where: {id:deliveryTypeIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    DeliveryType.name = newNameSanitized;
    
    
    [err] = await to(deliveryType.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'delivery type updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setDeliveryType;
