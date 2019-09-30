import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, ProductContentType } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setCustomerOrderStatus = async (req, res) => {
  const { 
      customerOrderStatusId,
      newName,
    } = req.body;

  // Input validation,
  if (customerOrderStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CUSTOMER_ORDER_STATUS_ID_IS_NOT_PROVIDED);
    return;
  }
  const customerOrderStatusIdValidationError = validateId(customerOrderStatusId);
  if (customerOrderStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, customerOrderStatusIdValidationError);
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
  const customerOrderStatusIdSanitized = sanitize(customerOrderStatusId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let customerOrderStatus;
  
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

    [err, customerOrderStatus] = await to(
      CustomerOrderStatus.findOne({where: {id:customerOrderStatusIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    ProductContentType.name = newNameSanitized;
    
    
    [err] = await to(customerOrderStatus.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'customer order status updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setCustomerOrderStatus;
