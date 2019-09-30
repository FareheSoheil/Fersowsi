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


const getPublisherOrderStatus = async (req, res) => {
  let err;
  let publisherOrderStatus;

  const { 
    publisherOrderStatusId
  } = req.body;

  if (publisherOrderStatusId != null) {
    const publisherOrderStatusIdValidationError = validateId(publisherOrderStatusId);
    if (publisherOrderStatusIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, publisherOrderStatusIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, publisherOrderStatus] = await to(
    PublisherOrderStatus.findAll({where: {id: (publisherOrderStatusId == null )? {gte:1} : publisherOrderStatusId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(publisherOrderStatus);
  return;
  

};

export default getPublisherOrderStatus;
