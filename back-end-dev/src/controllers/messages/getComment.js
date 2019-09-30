import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Comment } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getComment = async (req, res) => {
  let err;
  let commentList;
  
  const { 
    commentId
  } = req.body;

  if (commentId != null) {
    const commentIdValidationError = validateId(commentId);
    if (commentIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, commentIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, commentList] = await to(
    Comment.findAll({where: {id: (commentId == null )? {gte:1} : commentId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(commentList);
  return;
  

};

export default getComment;
