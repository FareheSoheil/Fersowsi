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


const getProductPeriod = async (req, res) => {
  let err;
  let ProductPeriodList;

  const { 
    productPeriodId
  } = req.body;

  if (productPeriodId != null) {
    const productPeriodIdValidationError = validateId(productPeriodId);
    if (productPeriodIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, productPeriodIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, ProductPeriodList] = await to(
    ProductPeriod.findAll({where: {id: (productPeriodId == null )? {gte:1} : productPeriodId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(ProductPeriodList);
  return;
  

};

export default getProductPeriod;
