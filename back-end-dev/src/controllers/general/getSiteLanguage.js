import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Job, SiteLanguage } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getSiteLanguage = async (req, res) => {
  let err;
  let siteLanguageList;

  const { 
    siteLanguageId
  } = req.body;

  if (siteLanguageId != null) {
    const siteLanguageIdValidationError = validateId(siteLanguageId);
    if (siteLanguageIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, siteLanguageIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, siteLanguageList] = await to(
    SiteLanguage.findAll({where: {id: (siteLanguageId == null )? {gte:1} : siteLanguageId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(siteLanguageList);
  return;
  

};

export default getSiteLanguage;
