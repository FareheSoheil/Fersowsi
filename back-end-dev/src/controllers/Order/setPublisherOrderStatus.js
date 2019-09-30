import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, ProductContentType } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setPublisherOrderStatus = async (req, res) => {
  const { 
      publisherOrderStatusId,
      newName,
    } = req.body;

  // Input validation,
  if (publisherOrderStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PUBLISHER_ORDER_STATUS_ID_IS_NOT_PROVIDED);
    return;
  }
  const publisherOrderStatusIdValidationError = validateId(publisherOrderStatusId);
  if (publisherOrderStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, publisherOrderStatusIdValidationError);
    return;
  }

  if (newName == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.NAME_IS_NOT_PROVIDED);
    return;
  }
  const newNameValidationError = validateName(newName);
  if (newNameValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newNameValidationError);
    return;
  }

  
  // input sanitization
  const publisherOrderStatusIdSanitized = sanitize(publisherOrderStatusId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let publisherOrderStatus;
  
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

    [err, publisherOrderStatus] = await to(
      PublisherOrderStatus.findOne({where: {id:publisherOrderStatusIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    PublisherOrderStatus.name = newNameSanitized;
    
    
    [err] = await to(publisherOrderStatus.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'publisher order status updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setPublisherOrderStatus;
