import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getCustomerOrderStatus = async (req, res) => {
  let err;
  let customerOrderStatusList;

  const { 
    customerOrderStatusId
  } = req.body;

  if (customerOrderStatusId != null) {
    const customerOrderStatusIdValidationError = validateId(customerOrderStatusId);
    if (customerOrderStatusIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, customerOrderStatusIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, customerOrderStatusList] = await to(
    CustomerOrderStatus.findAll({where: {id: (customerOrderStatusId == null )? {gte:1} : customerOrderStatusId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(customerOrderStatusList);
  return;
  

};

export default getCustomerOrderStatus;
