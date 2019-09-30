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


const setMessageStatus = async (req, res) => {
  const { 
      messageStatusId,
      newName,
    } = req.body;

  // Input validation,
  if (messageStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.MESSAGE_STATUS_ID_IS_NOT_PROVIDED);
    return;
  }
  const messageStatusIdValidationError = validateId(messageStatusId);
  if (messageStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, messageStatusIdValidationError);
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
  const messageStatusIdSanitized = sanitize(messageStatusId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let messageStatus;
  
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

    [err, messageStatus] = await to(
      MessageStatus.findOne({where: {id:messageStatusIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    MessageStatus.name = newNameSanitized;
    
    
    [err] = await to(messageStatus.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'message status updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setMessageStatus;
