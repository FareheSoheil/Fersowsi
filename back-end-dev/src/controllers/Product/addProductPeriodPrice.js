import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, ProductPeriodPrice } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addProductPeriodPrice = async (req, res) => {
  const { 
      newproductId,
      newProductPeriodId,
      newPublisherPrice,
      newCustomerPrice

    } = req.body;

  // Input validation
  

  if (newproductId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_ID_IS_NOT_PROVIDED);
    return;
  }
  const newproductIdValidationError = validateId(newproductId);
  if (newproductIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newproductIdValidationError);
    return;
  }

  if (newProductPeriodId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_PERIOD_ID_IS_NOT_PROVIDED);
    return;
  }
  const newProductPeriodIdValidationError = validateId(newProductPeriodId);
  if (newProductPeriodIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newProductPeriodIdValidationError);
    return;
  }


  if (newPublisherPrice == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PUBLISHER_PRICE_IS_NOT_PROVIDED);
    return;
  }
  const newPublisherPriceValidationError = validateName(newPublisherPrice);
  if (newPublisherPriceValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newPublisherPriceValidationError);
    return;
  }
  
  if (newCustomerPrice == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DESCRIPTION_IS_NOT_PROVIDED);
    return;
  }
  const newCustomerPriceValidationError = validateName(newCustomerPrice);
  if (newCustomerPriceValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newCustomerPriceValidationError);
    return;
  }


  // input sanitization
  const productPeriodPriceIdSanitized = sanitize(productPeriodPriceId);
  const newproductIdSanitized = sanitize(newproductId);
  const newProductPeriodIdSanitized = sanitize(newProductPeriodId);
  const newPublisherPriceSanitized = sanitize(newPublisherPrice);
  const newCustomerPriceSanitized = sanitize(newCustomerPrice);

  let err;
  let user;
  let productPeriodPrice;
  
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
      ProductPeriodPrice.create(
        {
          productId : newproductIdSanitized,
          productPeriodId : newProductPeriodIdSanitized,
          PublisherPrice : newPublisherPriceSanitized,
          CustomerPrice : newCustomerPriceSanitized,
        }
      )
    );

    
    [err] = await to(productPeriodPrice.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'product period price is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addProductPeriodPrice;
