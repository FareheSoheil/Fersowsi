import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, DeliveryPrice, LandingPage } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getLandingPage = async (req, res) => {
  let err;
  let landingPageList;
  
  const { 
    landingPageId
  } = req.body;

  if (landingPageId != null) {
    const landingPageIdValidationError = validateId(landingPageId);
    if (landingPageIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, landingPageIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, landingPageList] = await to(
    LandingPage.findAll({where: {id: (landingPageId == null )? {gte:1} : landingPageId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(landingPageList);
  return;
  

};

export default getLandingPage;
