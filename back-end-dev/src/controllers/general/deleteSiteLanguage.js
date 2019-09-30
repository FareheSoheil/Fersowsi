import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, SiteLanguage } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteSiteLanguage = async (req, res) => {
  let err;
  let selectedSiteLanguage;
  const {
    siteLanguageId
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

  //check access
  [err, user] = await to(
    User.findOne({where: {id: req.user.id}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if (user.roleId != 1) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedSiteLanguage] = await to(
    SiteLanguage.findOne({where: {id: siteLanguageId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedSiteLanguage){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedSiteLanguage.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'site language record is deleted'});
  return;

};

export default deleteSiteLanguage;
