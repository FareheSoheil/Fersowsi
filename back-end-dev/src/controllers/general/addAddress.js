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


const addAddress = async (req, res) => {
  const { 
      newCountryId,
      newUserId,
      newProvince,
      newCity,
      newDetailAddress
    } = req.body;

  // Input validation
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


    [err] = await to(
      Currency.create(
        {
          country: newCountryIdSanitized,
          userId: newUserIdSanitized,
          province: newProvinceSanitized,
          city: newCitysanitized,
          detailAdress:newDetailAddresssanitized,
        }
      )
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'address is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addAddress;
