import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {CustomerOrderStatus, PublisherOrderStatus } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deletePublisherOrderStatus = async (req, res) => {
  let err;
  let selectedPublisherOrderStatus;
  const {
    publisherOrderStatusId
  } = req.body;

  // Input validation
    if (publisherOrderStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PUBLISHER_ORDER_STATUS_ID_IS_NOT_PROVIDED);
    return;
  }
  const publisherOrderStatusIdValidationError = validateId(publisherOrderStatusId);
  if (publisherOrderStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, publisherOrderStatusIdValidationError);
    return;
  }

  // check if the user is signed in before
  [err, selectedPublisherOrderStatus] = await to(
    PublisherOrderStatus.findOne({where: {id: publisherOrderStatusId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedPublisherOrderStatus){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedPublisherOrderStatus.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'publisher order status is deleted'});
  return;

};

export default deletePublisherOrderStatus;
