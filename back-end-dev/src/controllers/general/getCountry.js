import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Country } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getcountry = async (req, res) => {
  let err;
  let counrtylist;
console.log("in country list function")
  const { 
    pageIndex,
    pageSize
  } = req.body;

  // check if the user is signed in before  
  [err, counrtylist] = await to(
    Country.findAll(),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({currentRecords: counrtylist, totalPageNum:1});
  return;
  

};

export default getcountry;
