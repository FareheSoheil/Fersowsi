import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, ProductContentCategory } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addProductContentCategory = async (req, res) => {
  const { 
      newproductId,
      newproductContentTypeId
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

  if (newproductContentTypeId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_CONTENT_TYPE_ID_IS_NOT_PROVIDED);
    return;
  }
  const newproductContentTypeIdValidationError = validateId(newproductContentTypeId);
  if (newproductContentTypeIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newproductContentTypeIdValidationError);
    return;
  }

  // input sanitization
  const newproductIdSanitized = sanitize(newproductId);
  const newproductContentTypeIdSanitized = sanitize(newproductContentTypeId);

  let err;
  let user;
  let productContentCategory;
  
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
      ProductContentCategory.create(
        {
           productId : newproductIdSanitized,
           productContentTypeId : newproductContentTypeIdSanitized,
        }
      )
    );
    
   
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'product content category is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default addProductContentCategory;
