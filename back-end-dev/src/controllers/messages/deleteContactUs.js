import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job, Claim, ContactUs } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteContactUs = async (req, res) => {
  let err;
  let selectedContactUs;
  let user;
  const {
    contactUsId
  } = req.body;

  // Input validation
  if (contactUsId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.COMMENT_ID_IS_NOT_PROVIDED);
    return;
  }
  const contactUsIdValidationError = validateId(contactUsId);
  if (contactUsIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, contactUsIdValidationError);
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
  [err, selectedContactUs] = await to(
    ContactUs.findOne({where: {id: contactUsId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedContactUs){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedContactUs.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'contactUs record is deleted'});
  return;

};

export default deleteContactUs;
