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


const getProductContentType = async (req, res) => {
  let err;
  let ProductContentTypeList;

  const { 
    productContentTypeId
  } = req.body;

  if (productContentTypeId != null) {
    const productContentTypeIdValidationError = validateId(productContentTypeId);
    if (productContentTypeIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, productContentTypeIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, ProductContentTypeList] = await to(
    ProductContentType.findAll({where: {id: (productContentTypeId == null )? {gte:1} : productContentTypeId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(ProductContentTypeList);
  return;
  

};

export default getProductContentType;
