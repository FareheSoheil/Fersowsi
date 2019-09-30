import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteJob = async (req, res) => {
  let err;
  let selectedJob;
  let user;
  const {
    jobId
  } = req.body;

  // Input validation
  if (jobId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.JOB_ID_IS_NOT_PROVIDED);
    return;
  }
  const jobIdValidationError = validateId(jobId);
  if (jobIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, jobIdValidationError);
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
  if (user.roleId >= 2) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  // check if the user is signed in before
  [err, selectedJob] = await to(
    Job.findOne({where: {id: jobId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedJob){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedJob.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'job record is deleted'});
  return;

};

export default deleteJob;
