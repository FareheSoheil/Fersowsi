import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Job, ProductLanguage } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setSiteLanguage = async (req, res) => {
  const { 
      siteLanguageId,
      newName,
    } = req.body;

  // Input validation
  if (siteLanguageId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.SITE_LANGUAGE_ID_IS_NOT_PROVIDED);
    return;
  }
  const siteLanguageIdValidationError = validateId(siteLanguageId);
  if (siteLanguageIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, siteLanguageIdValidationError);
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
  const siteLanguageIdSanitized = sanitize(siteLanguageId);
  const newNameSanitized = sanitize(newName);
  
  let err;
  let user;
  let siteLanguage;
  
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

    [err, siteLanguage] = await to(
      SiteLanguage.findOne({where: {id:siteLanguageIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    SiteLanguage.name = newNameSanitized;
    
    
    [err] = await to(siteLanguage.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'Product Language updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};

export default setSiteLanguage;
