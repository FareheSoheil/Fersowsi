import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Job } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const getJob = async (req, res) => {
  let err;
  let jobList;

  const { 
    jobId
  } = req.body;

  if (jobId != null) {
    const jobIdValidationError = validateId(jobId);
    if (jobIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, jobIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  
  [err, jobList] = await to(
    Job.findAll({where: {id: (jobId == null )? {gte:1} : jobId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  
  res.status(200).json(jobList);
  return;
  

};

export default getJob;
