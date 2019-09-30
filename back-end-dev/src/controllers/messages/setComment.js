import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Claim as Comment } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setComment = async (req, res) => {
  const { 
      commentId,
      newProductId,
      newActionUserId,
      newUserId,
      newRepliedCommentId,
      newMessageStatusId
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

  if (newProductId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PRODUCT_ID_IS_NOT_PROVIDED);
    return;
  }
  const newProductIdValidationError = validateId(newProductId);
  if (newProductIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newProductIdValidationError);
    return;
  }

  if (newUserId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USER_ID_IS_NOT_PROVIDED);
    return;
  }

  const newUserIdValidationError = validateId(newUserId);
  if (newUserIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newUserIdValidationError);
    return;
  }

  if (newRepliedCommentId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.REPLIED_COMMENT_ID_IS_NOT_PROVIDED);
    return;
  }

  const newRepliedCommentIdValidationError = validateId(newRepliedCommentId);
  if (newRepliedCommentIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newRepliedCommentIdValidationError);
    return;
  }

  if (newActionUserId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACTION_USER_ID_IS_NOT_PROVIDED);
    return;
  }

  const newActionUserIdValidationError = validateId(newActionUserId);
  if (newActionUserIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newActionUserIdValidationError);
    return;
  }

  if (newMessageStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.MESSAGE_STATUS_ID_IS_NOT_PROVIDED);
    return;
  }

  const newMessageStatusIdValidationError = validateId(newMessageStatusId);
  if (newMessageStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newMessageStatusIdValidationError);
    return;
  }

  

  // input sanitization
  const commentIdSanitized = sanitize(commentId);
  const newProductIdSanitized = sanitize(newProductId);
  const newUserIdSanitized = sanitize(newUserId);
  const newRepliedCommentIdSanitized = sanitize(newRepliedCommentId);
  const newActionUserIdSanitized = sanitize(newactionUserId);
  const newMessageStatusIdSanitized = sanitize(newmessageStatusId);

  let err;
  let user;
  let comment;
  
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

    [err, comment] = await to(
      Comment.findOne({where: {id:commentIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    Comment.productId = newProductIdSanitized;
    Comment.actionUserId = newActionUserIdSanitized;
    Comment.userId = newUserIdSanitized;
    Comment.repliedCommentId = newRepliedCommentIdSanitized;
    Comment.messageStatusId = newMessageStatusIdSanitized;
    Comment.repliedCommentId = newRepliedCommentIdSanitized;


    [err] = await to(comment.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'Comment updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  };

export default setComment;
