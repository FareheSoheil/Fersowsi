import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getCustomerOrder = async (req, res) => {
  let err;
  let customerOrderList;
  
  const { 
    customerOrderId
  } = req.body;

  if (customerOrderId != null) {
    const customerOrderIdValidationError = validateId(customerOrderId);
    if (customerOrderIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, customerOrderIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, customerOrderList] = await to(
    CustomerOrder.findAll({where: {id: (customerOrderId == null )? {gte:1} : customerOrderId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(customerOrderList);
  return;
  

};

export default getCustomerOrder;
