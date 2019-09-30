import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {Currency, User } from '../../models';
import sanitization from '../../sanitization';
import {
  validateId
} from '../../validation';

const getAllUser = async (req, res) => {
  let err;
  let userList;
  
  console.log("in getAllUsers")

  const {
    pageIndex,
    pageSize
  } = req.body;


  if (userId != null) {
    const userIdValidationError = validateId(userId);
    if (userIdValidationError.length > 0) {
      resError(res, 500, titles.FETCH_STATE_ERROR, userIdValidationError);
      return;
    }
  }

  // check if the user is signed in before
  [err, userList] = await to(
    User.findAll({where: {id: (userId == null )? {gte:1} : userId}}),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }
  
  res.status(200).json(userList);
  return;
  

};

export default getAllUser;
