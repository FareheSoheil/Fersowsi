import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User,Invoice } from '../../models';
import {
  validateId,
  validateNumber,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addInvoice = async (req, res) => {
  const { 
      newCustomerOrderId,
      newImageAddress
      } = req.body;

  // Input validation

  if (newCustomerOrderId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CUSTOMER_ORDER_IS_NOT_PROVIDED);
    return;
  }
  const newCustomerOrderIdValidationError = validateId(newCustomerOrderId);
  if (newCustomerOrderIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newCustomerOrderIdValidationError);
    return;
  }

  if (newImageAddress == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.IMAGE_ADDRESS_ID_IS_NOT_PROVIDED);
    return;
  }
  const newImageAddressValidationError = validateId(newImageAddress);
  if (newImageAddressValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newImageAddressValidationError);
    return;
  }


  // input sanitization
  const newCustomerOrderIdSanitized = sanitize(newCustomerOrderId);
  const newImageAddressSanitized = sanitize(newImageAddress);

  let err;
  let user;
  let invoice;
  
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
      Invoice.create(
        {
          customerOrderId : newCustomerOrderIdSanitized,
          imageAddress : newImageAddressSanitized,
 
        }
      )
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'invoic is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addInvoice;
