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


const getSingleProductType = async (req, res) => {
  let err;
  let SingleProductTypeList;

  const { 
    singleProductTypeId
  } = req.body;

  if (singleProductTypeId != null) {
    const singleProductTypeIdValidationError = validateId(singleProductTypeId);
    if (singleProductTypeIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, singleProductTypeIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, SingleProductTypeList] = await to(
    SingleProductType.findAll({where: {id: (singleProductTypeId == null )? {gte:1} : singleProductTypeId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(SingleProductTypeList);
  return;
  

};

export default getSingleProductType;
