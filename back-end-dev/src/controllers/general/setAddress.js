import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Address } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setAddress = async (req, res) => {
  const { 
      addressId,
      newCountryId,
      newUserId,
      newProvince,
      newCity,
      newDetailAddress
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

  if (newCountryId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.COUNTRY_ID_IS_NOT_PROVIDED);
    return;
  }
  const newCountryIdValidationError = validateId(newCountryId);
  if (newCountryIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newCountryIdValidationError);
    return;
  }

  if (newUserId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USER_ID_IS_NOT_PROVIDED);
    return;
  }
  const newUserIdValidationError = validateId(newUserId);
  if (newUserIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newUserIdValidationError);
    return;
  }
  if (newProvince == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PROVINCE_IS_NOT_PROVIDED);
    return;
  }
  const newProvinceValidationError = validateName(newProvince);
  if (newProvinceValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newProvinceValidationError);
    return;
  }

  if (newCity == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CITY_IS_NOT_PROVIDED);
    return;
  }
  const newCityValidationError = validateName(newCity);
  if (newCityValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newCityValidationError);
    return;
  }

  if (newDetailAddress == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DETAILL_ADDRESS_IS_NOT_PROVIDED);
    return;
  }
  const newDetailAddressValidationError = validateName(newDetailAddress);
  if (newDetailAddressValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newDetailAddressValidationError);
    return;
  }

  // input sanitization
  const addressIdSanitized = sanitize(addressId);
  const newCountryIdSanitized = sanitize(newCountryId);
  const newUserIdSanitized = sanitize(newUserId);
  const newProvinceSanitized = sanitize(newProvince);
  const newCitysanitized = sanitize(newCity);
  const newDetailAddresssanitized = sanitize(newDetailAddress);

  let err;
  let user;
  let address;
  
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

    [err, address] = await to(
      Address.findOne({where: {id:addressIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    Address.country = newCountryIdSanitized,
    Address.userId = newUserIdSanitized,
    Address.province = newProvinceSanitized,
    Address.city = newCitysanitized,
    Address.detailAdress = newDetailAddresssanitized,
    
    [err] = await to(address.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'address updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setAddress;
