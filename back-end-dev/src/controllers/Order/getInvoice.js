import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Invoice } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getInvoice = async (req, res) => {
  let err;
  let invoiceList;
  
  const { 
    invoiceId
  } = req.body;

  if (invoiceId != null) {
    const invoiceIdValidationError = validateId(invoiceId);
    if (invoiceIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, invoiceIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, invoiceList] = await to(
    Invoice.findAll({where: {id: (invoiceId == null )? {gte:1} : invoiceId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(invoiceList);
  return;
  

};

export default getInvoice;
