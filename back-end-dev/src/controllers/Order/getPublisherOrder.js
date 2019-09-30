import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Basket, PublisherOrder } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getPublisherOrder = async (req, res) => {
  let err;
  let publisherOrderList;
  
  const { 
    publisherOrderId
  } = req.body;

  if (publisherOrderId != null) {
    const publisherOrderIdValidationError = validateId(publisherOrderId);
    if (publisherOrderIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, publisherOrderIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, publisherOrderList] = await to(
    PublisherOrder.findAll({where: {id: (publisherOrderId == null )? {gte:1} : publisherOrderId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(publisherOrderList);
  return;
  

};

export default getPublisherOrder;
