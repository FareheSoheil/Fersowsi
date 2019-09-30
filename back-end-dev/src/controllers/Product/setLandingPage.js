import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, ProductContentType, LandingPage } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setLandingPage = async (req, res) => {
  const { 
      landingPageId,
      newProductId,
    } = req.body;

  // Input validation,
  if (landingPageId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.LANDING_PAGE_ID_IS_NOT_PROVIDED);
    return;
  }
  const landingPageIdValidationError = validateId(landingPageId);
  if (landingPageIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, landingPageIdValidationError);
    return;
  }

  if (newProductId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_ID_IS_NOT_PROVIDED);
    return;
  }
  const newProductIdValidationError = validateId(newProductId);
  if (newProductIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newProductIdValidationError);
    return;
  }

  
  // input sanitization
  
  const newProductIdSanitized = sanitize(newProductId);
  
  let err;
  let user;
  let landingPage;
  
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

    [err, landingPage] = await to(
      LandingPage.findOne({where: {id:landingPageId}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    LandingPage.productId = newProductIdSanitized;
    
    
    [err] = await to(landingPage.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'landing Page updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setLandingPage;
