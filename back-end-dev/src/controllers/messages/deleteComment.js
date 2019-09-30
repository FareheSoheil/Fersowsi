import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, Job, Claim } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const deleteComment = async (req, res) => {
  let err;
  let selectedComment;
  let user;
  const {
    commentId
  } = req.body;

  // Input validation
  if (commentId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.COMMENT_ID_IS_NOT_PROVIDED);
    return;
  }
  const commentIdValidationError = validateId(commentId);
  if (commentIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, commentIdValidationError);
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
  [err, selectedComment] = await to(
    Comment.findOne({where: {id: commentId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  if(!selectedComment){
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECORD_NOT_FOUND_FOR_DELETION);
    return;
  }

  [err] = await to (selectedComment.destroy());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({message: 'comment record is deleted'});
  return;

};

export default deleteComment;
