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


const getMessageStatus = async (req, res) => {
  let err;
  let messageStatusList;

  const { 
    messageStatusId
  } = req.body;

  if (messageStatusId != null) {
    const messageStatusIdValidationError = validateId(messageStatusId);
    if (messageStatusIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, messageStatusIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, messageStatusList] = await to(
    MessageStatus.findAll({where: {id: (messageStatusId == null )? {gte:1} : messageStatusId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(messageStatusList);
  return;
  

};

export default getMessageStatus;
