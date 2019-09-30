import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, LandingPage } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addLandingPage = async (req, res) => {
  const { 
      newProductId
    } = req.body;

  // Input validation
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
  let currency;
  
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
      LandingPage.create(
        {
          productId: newProductIdSanitized,
  
        }
      )
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'landing pages is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addLandingPage;
