import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job, Claim, Basket, Invoice } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteInvoice = async (req, res) => {
  let err;
  let selectedInvoice;
  let user;
  const {
    invoiceId
  } = req.body;

  // Input validation
  if (invoiceId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.INVOICE_IS_NOT_PROVIDED);
    return;
  }
  const invoiceIdValidationError = validateId(invoiceId);
  if (invoiceIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, invoiceIdValidationError);
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
  [err, selectedInvoice] = await to(
    Invoice.findOne({where: {id: invoiceId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedInvoice){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedInvoice.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'invoice record is deleted'});
  return;

};

export default deleteInvoice;
