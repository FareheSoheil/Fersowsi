import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, MessageStatus } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteMessageStatus = async (req, res) => {
  let err;
  let selectedMessageStatus;
  const {
    messageStatusId
  } = req.body;

  // Input validation
  if (messageStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.MESSAGE_STATUS_ID_IS_NOT_PROVIDED);
    return;
  }
  const messageStatusIdValidationError = validateId(messageStatusId);
  if (messageStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, messageStatusIdValidationError);
    return;
  }

  // check if the user is signed in before
  [err, selectedMessageStatus] = await to(
    MessageStatus.findOne({where: {id: messageStatusId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!messageStatusId){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedMessageStatus.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'message status is deleted'});
  return;

};

export default deleteMessageStatus;;
