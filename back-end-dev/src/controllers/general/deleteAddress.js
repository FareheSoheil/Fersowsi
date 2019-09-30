import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Address } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteAddress = async (req, res) => {
  let err;
  let selectedAddress;
  let user;
  const {
    addressId
  } = req.body;

  // Input validation
  if (addressId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ADDRESS_ID_IS_NOT_PROVIDED);
    return;
  }
  const addressIdValidationError = validateId(addressId);
  if (addressIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, addressIdValidationError);
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
  [err, selectedAddress] = await to(
    Address.findOne({where: {id: addressId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedAddress){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedAddress.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'address record is deleted'});
  return;

};

export default deleteAddress;
