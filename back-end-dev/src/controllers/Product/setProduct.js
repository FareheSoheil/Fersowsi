import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Product } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary,
  validateNumber
} from '../../validation';
import sanitize from '../../sanitization';


const setProduct = async (req, res) => {
  const { 
      productId,
      newProductTypeId,
      newSingleProductTypeId,
      newAgeGroupId,
      newPublishPeriodId,
      newPublisherId,
      newLanguageId,
      newPrice,
      newDiscount,
      newTax,
      newIssn,
      newDewey,
      newAsb,
      newEnglishTitle,
      newEnglishDesc,
      newWeight,
      newCoverImage
    } = req.body;

  // Input validation
  if (productId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_ID_IS_NOT_PROVIDED);
    return;
  }
  const productIdValidationError = validateId(productId);
  if (productIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productIdValidationError);
    return;
  }

  if (newProductTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const newProductTypeIdValidationError = validateId(newProductTypeId);
  if (newProductTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newProductTypeIdValidationError);
    return;
  }

  if (newSingleProductTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.SINGLE_PRODUCT_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const newSingleProductTypeIdValidationError = validateId(newSingleProductTypeId);
  if (newSingleProductTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newSingleProductTypeIdValidationError);
    return;
  }

  if (newAgeGroupId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.AGE_GROUP_ID_IS_NOT_PROVIDED);
    return;
  }
  const newAgeGroupIdValidationError = validateId(newAgeGroupId);
  if (newAgeGroupIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newAgeGroupIdValidationError);
    return;
  }

  if (newPublishPeriodId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PUBLISHER_PERIOD_ID_IS_NOT_PROVIDED);
    return;
  }
  const newPublishPeriodIdValidationError = validateId(newPublishPeriodId);
  if (newPublishPeriodIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newPublishPeriodIdValidationError);
    return;
  }

  if (newPublisherId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PUBLISHER_ID_IS_NOT_PROVIDED);
    return;
  }
  const newPublisherIdValidationError = validateId(newPublisherId);
  if (newPublisherIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newPublisherIdValidationError);
    return;
  }

  if (newLanguageId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.LANGUAGE_ID_IS_NOT_PROVIDED);
    return;
  }
  const newLanguageIdValidationError = validateId(newLanguageId);
  if (newLanguageIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newLanguageIdValidationError);
    return;
  }

  if (newPrice == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRICE_IS_NOT_PROVIDED);
    return;
  }
  const newPriceValidationError = validateNumber(newPrice);
  if (newPriceValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newPriceValidationError);
    return;
  }

  if (newDiscount == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRICE_IS_NOT_PROVIDED);
    return;
  }
  const newDiscountValidationError = validateNumber(newDiscount);
  if (newDiscountValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newDiscountValidationError);
    return;
  }

  if (newTax == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.TAX_IS_NOT_PROVIDED);
    return;
  }
  const newTaxValidationError = validateNumber(newTax);
  if (newTaxValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newTaxValidationError);
    return;
  }
  
  if (newIssn == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ISSN_IS_NOT_PROVIDED);
    return;
  }
  const newIssnValidationError = validateNumber(newIssn);
  if (newIssnValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newIssnValidationError);
    return;
  }

  if (newDewey == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DEWEY_IS_NOT_PROVIDED);
    return;
  }
  const newDeweyValidationError = validateNumber(newDewey);
  if (newDeweyValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newDeweyValidationError);
    return;
  }

  if (newAsb == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ASB_IS_NOT_PROVIDED);
    return;
  }
  const newAsbValidationError = validateNumber(newAsb);
  if (newAsbValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newAsbValidationError);
    return;
  }

  if (newEnglishTitle == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ENGLISH_TITLE_IS_NOT_PROVIDED);
    return;
  }
  const newEnglishTitleValidationError = validateNumber(newEnglishTitle);
  if (newEnglishTitleValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newEnglishTitleValidationError);
    return;
  }

  if (newEnglishDesc == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ENGLISH_DESC_IS_NOT_PROVIDED);
    return;
  }
  const newEnglishDescValidationError = validateNumber(newEnglishDesc);
  if (newEnglishDescValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newEnglishDescValidationError);
    return;
  }

  if (newWeight == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.WEIGHT_IS_NOT_PROVIDED);
    return;
  }
  const newWeightValidationError = validateNumber(newWeight);
  if (newWeightValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newWeightValidationError);
    return;
  }


  if (newCoverImage == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.COVER_IMAGE_IS_NOT_PROVIDED);
    return;
  }
  const newCoverImageValidationError = validateNumber(newCoverImage);
  if (newCoverImageValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newCoverImageValidationError);
    return;
  }
  
  
  
  // input sanitization
  const productIdSanitized = sanitize(productId);
  const newProductTypeIdSanitized = sanitize(newProductTypeId);
  const newSingleProductTypeIdSanitized = sanitize(newSingleProductTypeId);
  const newAgeGroupIdSanitized = sanitize(newAgeGroupId);
  const newPublishPeriodIdSanitized = sanitize(newPublishPeriodId);
  const newPublisherIdSanitized = sanitize(newPublisherId);
  const newLanguageIdSanitized = sanitize(newLanguageId);
  const newPriceSanitized = sanitize(newPrice);
  const newDiscountSanitized = sanitize(newDiscount);
  const newTaxSanitized = sanitize(newTax);
  const newIssnSanitized = sanitize(newIssn);
  const newDeweySanitized = sanitize(newDewey);
  const newAsbSanitized = sanitize(newAsb);
  const newEnglishTitleSanitized = sanitize(newEnglishTitle);
  const newEnglishDescSanitized = sanitize(newEnglishDesc);
  const newWeightSanitized = sanitize(newWeight);
  const newCoverImageSanitized = sanitize(newCoverImage);

  let err;
  let user;
  let product;
  
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

    [err, product] = await to(
      Product.findOne({where: {id:productIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

      Product.productTypeId = newProductTypeIdSanitized;
      Product.singleProductTypeId = newSingleProductTypeIdSanitized;
      Product.ageGroupId = newAgeGroupIdSanitized;
      Product.publishPeriodId = newPublishPeriodIdSanitized;
      Product.publisherId = newPublisherIdSanitized;
      Product.languageId = newLanguageIdSanitized;
      Product.price = newPriceSanitized;
      Product.discount = newDiscountSanitized;
      Product.tax = newTaxSanitized;
      Product.issn = newIssnSanitized;
      Product.dewey = newDeweySanitized;
      Product.asb = newAsbSanitized;
      Product.englishTitle = newEnglishTitleSanitized;
      Product.englishDesc = newEnglishDescSanitized;
      Product.weight = newWeightSanitized;
      Product.coverImage = newCoverImageSanitized;

  
    [err] = await to(product.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'product updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setProduct;
