import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job, Claim, Basket, CustomerOrder } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteCustomerOrder = async (req, res) => {
  let err;
  let selectedCustomerOrder;
  let user;
  const {
    customerOrderId
  } = req.body;

  // Input validation
  if (customerOrderId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CUSTOMER_ORDER_IS_NOT_PROVIDED);
    return;
  }
  const customerOrderIdValidationError = validateId(customerOrderId);
  if (customerOrderIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, customerOrderIdValidationError);
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
  [err, selectedCustomerOrder] = await to(
    CustomerOrder.findOne({where: {id: customerOrderId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedCustomerOrder){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedCustomerOrder.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'customer order record is deleted'});
  return;

};

export default deleteCustomerOrder;
