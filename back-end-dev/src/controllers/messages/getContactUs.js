import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ContactUs } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getContactUs = async (req, res) => {
  let err;
  let contactUsList;
  
  const { 
    contactUsId
  } = req.body;

  if (contactUsId != null) {
    const contactUsIdValidationError = validateId(contactUsId);
    if (contactUsIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, contactUsIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, contactUsList] = await to(
    ContactUs.findAll({where: {id: (contactUsId == null )? {gte:1} : contactUsId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(contactUsList);
  return;
  

};

export default getContactUs;
