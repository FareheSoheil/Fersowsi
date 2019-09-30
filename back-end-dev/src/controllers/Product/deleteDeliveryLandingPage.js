import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, ProductContentCategory, ProductContentType, ProductPeriod, DeliveryPrice, LandingPage } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteLandingPage = async (req, res) => {
  let err;
  let selectedLandingPage;
  const {
    landingPageId
  } = req.body;

  // Input validation
    if (landingPageId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.LANDING_PAGE_ID_IS_NOT_PROVIDED);
    return;
  }
  const landingPageIdValidationError = validateId(landingPageId);
  if (landingPageIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, landingPageIdValidationError);
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
  [err, selectedLandingPage] = await to(
    LandingPage.findOne({where: {id: landingPageId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedLandingPage){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedLandingPage.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'landing page record is deleted'});
  return;

};

export default deleteLandingPage;
