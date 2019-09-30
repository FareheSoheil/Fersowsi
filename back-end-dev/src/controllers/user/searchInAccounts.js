import to from 'await-to-js';
import Sequelize from 'sequelize';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User } from '../../models';
const Op = Sequelize.Op;
import sanitize from '../../sanitization';
import {validateSearchId} from '../../validation'

const searchInAccounts = async (req, res) => {
  const { 
      roleId, //0: None, 2:Operator, 3:Publisher, 4:Customer
      userSubCategoryId, //0: None, 1:Library, 2: Goverment: 3:School, ....
      userActivitionStatusId, //0:None, 1:waitForApprove, 2:activate, 3:deactivate
      countryId, //0:None, ....
      jobId, //0:None, ....
      emailConfirmed, //0:NONE, 1:True, 2:False
      name,
      email,
      number,
    } = req.body;
    
  //Input Validation  
  if (email == null) {
    resError(res, 500, titles.SEARCH_ERROR, errors.EMAIL_FIELD_IS_EMPTY);
    return;
  }
  if (name == null) {
    resError(res, 500, titles.SEARCH_ERROR, errors.NAME_IS_NOT_PROVIDED);
    return;
  }
  if (number == null) {
    resError(res, 500, titles.SEARCH_ERROR, errors.NUMBER_IS_NOT_PROVIDED);
    return;
  }


  if (!roleId) {
    resError( res , 500 , titles.SEARCH_ERROR , errors.ROLE_ID_IS_EMPTY);
    return;
  }
  const roleIdValidationError = validateSearchId(roleId);
  if(roleIdValidationError.length > 0) {
    resError(res, 500, titles.SEARCH_ERROR, roleIdValidationError);
    return;
  }

  if (!userSubCategoryId) {
    resError(res, 500, titles.SEARCH_ERROR, errors.USER_SUB_CATEGORY_ID_IS_EMPTY);
    return;
  }
  const userSubCategoryIdValidationError = validateSearchId(userSubCategoryId);
  if(userSubCategoryIdValidationError.length > 0) {
    resError(res, 500, titles.SEARCH_ERROR, userSubCategoryIdValidationError);
    return;
  }

  if (!emailConfirmed) {
    resError(res, 500, titles.SEARCH_ERROR, errors.USER_SUB_CATEGORY_ID_IS_EMPTY);
    return;
  }
  const emailConfirmedValidationError = validateSearchId(emailConfirmed);
  if(emailConfirmedValidationError.length > 0) {
    resError(res, 500, titles.SEARCH_ERROR, emailConfirmedValidationError);
    return;
  }

  if (!userActivitionStatusId) {
    resError(res, 500, titles.SEARCH_ERROR, errors.USER_SUB_CATEGORY_ID_IS_EMPTY);
    return;
  }
  const userActivitionStatusIdValidationError = validateSearchId(userActivitionStatusId);
  if(userActivitionStatusIdValidationError.length > 0) {
    resError(res, 500, titles.SEARCH_ERROR, userActivitionStatusIdValidationError);
    return;
  }

  if (!countryId) {
    resError(
      res, 500, titles.SEARCH_ERROR, errors.COUNTRY_ID_IS_EMPTY,
    );
    return;
  }
  const countryIdValidationError = validateSearchId(countryId);
  if(countryIdValidationError.length > 0) {
    resError(res, 500, titles.SEARCH_ERROR, countryIdValidationError);
    return;
  }

  if (!jobId) {
    resError(res, 500, titles.SEARCH_ERROR, errors.JOB_ID_IS_EMPTY,);
    return;
  }
  const jobIdValidationError = validateSearchId(jobId);
  if(jobIdValidationError.length > 0) {
    resError(res, 500, titles.SEARCH_ERROR, jobIdValidationError);
    return;
  }

  // input sanitization
  const emailSanitized = sanitize(email);
  const nameSanitized = sanitize(name);
  const numberSanitized = sanitize(number);
  const emailConfirmedSanitized = sanitize(emailConfirmed);
  const roleIdSanitized = sanitize(roleId);
  const userSubCategoryIdSanitized = sanitize(userSubCategoryId);
  const userActivitionStatusIdSanitized = sanitize(userActivitionStatusId);
  const countryIdSanitized = sanitize(countryId);
  const jobIdSanitized = sanitize(jobId);

  //check user is admin or operator or not
  let user;
  let err;
  let users;

  if (req.user){ 
    //check access
    [err,user] = await to (
      User.findOne({where : {id: req.user.id}})
    );
    if (err) {
      resError(res, 500, titles.DATABASE_ERROR, errors.DATABASE_ERROR);
      return;
    }
    if(user.roleId >2) {
      resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
      return;
    }

    [err, users] = await to (User.findAll({ 
      attributes: ['id', 'firstName', 'lastName', 'contractName', 'email'],
      where: Sequelize.and(
      {email:{[Op.like]: '%'+emailSanitized+'%'}},
      Sequelize.or(
        {firstname: {[Op.like]: '%'+nameSanitized+'%'}},
        {lastName: {[Op.like]: '%'+nameSanitized+'%'}},
        {contractName: {[Op.like]: '%'+nameSanitized+'%'}}),
      Sequelize.or(
        {phoneNumber: {[Op.like]: '%'+numberSanitized+'%'}},
        {vatId: {[Op.like]: '%'+numberSanitized+'%'}},
        {faxNumber: {[Op.like]: '%'+numberSanitized+'%'}},
        {psn: {[Op.like]: '%'+numberSanitized+'%'}},
        {mobileNumber: {[Op.like]: '%'+numberSanitized+'%'}}),
      {roleId: (roleIdSanitized == 0) ? {gte:0} : roleIdSanitized},
      {jobId: (jobIdSanitized ==0 )? {gte:0} : jobIdSanitized},
      {emailConfirmed: (emailConfirmedSanitized ==0 )? {gte:0} : emailConfirmedSanitized} ,
      {userSubCategoryId: (userSubCategoryIdSanitized ==0 )? {gte:0} : userSubCategoryIdSanitized},
      {userActivitionStatusId: (userActivitionStatusIdSanitized ==0 )? {gte:0} : userActivitionStatusIdSanitized},
      {countryId: (countryIdSanitized ==0 )? {gte:0} : countryIdSanitized },
      {id: {gte:2}}
    )},
    ));
    if (err) {
      resError(res, 500, titles.SEARCH_ERROR, err);
      return;
    }

    res.status(200).json({users: users});
    return ;
  }
  else {
    // user is not signed in
    resError(res, 500, titles.Login_ERROR, errors.USER_IS_NOT_SIGNED_IN);
    return;
  }
};

export default searchInAccounts;
