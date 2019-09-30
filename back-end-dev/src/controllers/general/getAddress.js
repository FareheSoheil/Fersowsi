import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { Address } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getAddress = async (req, res) => {
  let err;
  let addressList;
  
  const { 
    addressId
  } = req.body;

    if (addressId != null) {
    const addressIdValidationError = validateId(addressId);
    if (addressIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, addressIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, addressList] = await to(
    Address.findAll({where: {id: (addressId == null )? {gte:1} : addressId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(addressList);
  return;
  

};

export default getAddress;
