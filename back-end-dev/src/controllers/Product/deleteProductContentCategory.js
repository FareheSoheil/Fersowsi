import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteProductContentCategory = async (req, res) => {
  let err;
  let selectedProductContentCategory;
  const {
    productContentCategoryId
  } = req.body;

  // Input validation
  if (productContentCategoryId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_CONTENT_CATEGORY_ID_IS_NOT_PROVIDED);
    return;
  }
  const productContentCategoryIdValidationError = validateId(productContentCategoryId);
  if (productContentCategoryIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, productContentCategoryIdValidationError);
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
  [err, selectedProductContentCategory] = await to(
    ProductContentCategory.findOne({where: {id: productContentCategoryId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedProductContentCategory){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedProductContentCategory.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'product Content Category record is deleted'});
  return;

};

export default deleteProductContentCategory;
