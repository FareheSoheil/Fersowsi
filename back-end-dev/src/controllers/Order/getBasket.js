import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Basket } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getBasket = async (req, res) => {
  let err;
  let basketList;
  
  const { 
    basketId
  } = req.body;

  if (basketId != null) {
    const basketIdValidationError = validateId(basketId);
    if (basketIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, basketIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, basketList] = await to(
    Basket.findAll({where: {id: (basketId == null )? {gte:1} : basketId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(basketList);
  return;
  

};

export default getBasket;
