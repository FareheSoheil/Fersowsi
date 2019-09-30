import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {CustomerOrderStatus } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteCustomerOrderStatus = async (req, res) => {
  let err;
  let selectedCustomerOrderStatus;
  const {
    customerOrderStatusId
  } = req.body;

  // Input validation
    if (customerOrderStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CUSTOMER_ORDER_STATUS_ID_IS_NOT_PROVIDED);
    return;
  }
  const customerOrderStatusIdValidationError = validateId(customerOrderStatusId);
  if (customerOrderStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, customerOrderStatusIdValidationError);
    return;
  }

  // check if the user is signed in before
  [err, selectedCustomerOrderStatus] = await to(
    CustomerOrderStatus.findOne({where: {id: customerOrderStatusId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedCustomerOrderStatus){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedCustomerOrderStatus.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'Customer Order Status is deleted'});
  return;

};

export default deleteCustomerOrderStatus;
