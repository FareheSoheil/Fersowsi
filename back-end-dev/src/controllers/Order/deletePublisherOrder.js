import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job, Claim, Basket, CustomerOrder, PublisherOrder } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deletePublisherOrder = async (req, res) => {
  let err;
  let selectedPublisherOrder;
  let user;
  const {
    publisherOrderId
  } = req.body;

  // Input validation
  if ( publisherOrderId== null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PUBLISHER_ORDER_ID_IS_NOT_PROVIDED);
    return;
  }
  const publisherOrderIdValidationError = validateId(publisherOrderId);
  if (publisherOrderIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, publisherOrderIdValidationError);
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
  if (user.roleId > 2) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedPublisherOrder] = await to(
    PublisherOrder.findOne({where: {id: publisherOrderId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedPublisherOrder){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedPublisherOrder.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'publisher order record is deleted'});
  return;

};

export default deletePublisherOrder;
