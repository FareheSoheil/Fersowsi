import to from 'await-to-js';
import { User } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';
import sanitize from '../../sanitization';
import {validateId, validateNumber, validateEmail, validateFloatNumber,
       validateName, validateBinary, validateMobileNumber, validatePassword,
       validateFirstName, validateLastName, validateContractName} from '../../validation'


const setUser = async (req, res) => {
    const {
        userId,
        firstName,
        lastName,
        contractName,
        phoneNumber,
        mobileNumber,
        faxNumber,
        homePage,
        vatId,
        psn,
        password,
        dateOfBirth,
        discount,
        username,
        emailConfirmed,
        profilePic,
        bio,
        userActivitionStatusId,
        currencyId,
        roleId,
        userSubCategoryId,
        email,
        languageId,
        jobId,
        countryId,
    } = req.body
    
  //InputValidation
  
  //id
  if (!id) {
    resError( res , 500 , titles.UPDATE_PROFILE , errors.USER_ID_IS_NOT_CORRECT);
    return;
  }
  const userIdValidationError = validateId(id);
  if(userIdValidationError.length > 0) {
  resError(res, 500, titles.UPDATE_PROFILE, userIdValidationError);
  return;
  }

  //email
  if (email == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.EMAIL_IS_NOT_PROVIDED);
    return;
  }
  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, emailValidationError);
    return;
  }

  //password
  if (password == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.PASSWORD_IS_NOT_PROVIDED,);
    return;
  }
  if(password != '') {
    const passwordValidationError = validatePassword(password, true);
    if (passwordValidationError.length > 0) {
        resError(res, 500, titles.UPDATE_PROFILE, passwordValidationError);
        return;
    }
  }

  //first number
  if (firstName == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.FIRST_NAME_IS_NOT_PROVIDED);
    return;
  }
  const firstNameValidationError = validateFirstName(firstName);
  if (firstNameValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, firstNameValidationError);
    return;
  }
  

  //last number
  if (lastName == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.LAST_NAME_IS_NOT_PROVIDED,);
    return;
  }
  const lastNameValidationError = validateLastName(lastName);
  if (lastNameValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, lastNameValidationError);
    return;
  }

  //contract number
  if (!contractName) {
    resError(res,500,titles.UPDATE_PROFILE,errors.CONTRACT_NAME_IS_NOT_PROVIDED,);
    return;
  }
  const contractNameValidationError = validateContractName(contractName);
  if (contractNameValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, contractNameValidationError);
    return;
  }

  //mobile number
  if (mobileNumber == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.MOBILE_NUMBER_IS_NOT_PROVIDED,);
    return;
  }
  const mobileNumberValidationError = validateMobileNumber(mobileNumber);
  if(mobileNumberValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, mobileNumberValidationError);
    return;
  }
  

  //phone number
  if (phoneNumber == null) {
    resError( res, 500, titles.UPDATE_PROFILE, errors.PHONE_NUMBER_FIELD_IS_EMPTY,);
    return;
  }


  //fax number
  if (faxNumber == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.FAX_NUMBER_IS_NOT_PROVIDED,);
    return;
  }

  // homepage validation
  if (homePage == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.HOME_PAGE_IS_NOT_PROVIDED,);
    return;
  }

  //vatId
  if (vatId == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.VAT_ID_IS_NOT_PROVIDED,);
    return;
  }
  const vatIdValidationError = validateName(vatId);
  if(vatIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, vatIdValidationError);
    return;
  }
  
  //psn
  if (psn == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.PSN_ID_IS_NOT_PROVIDED,);
    return;
  }
  const psnIdValidationError = validateName(psn);
  if(psnIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, psnIdValidationError);
    return;
  }
  

//   dateOfBirth,
  if (dateOfBirth == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.DATE_OF_BIRTH_IS_NOT_PROVIDED,);
    return;
  }

  
//   discount,
  if (discount == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.PSN_ID_IS_NOT_PROVIDED,);
    return;
  }
  const discountValidationError = validateFloatNumber(discount);
  if(discountValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, discountValidationError);
    return;
  }
  
//   username,
  if (username == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.USERNAME_FIELD_IS_EMPTY);
    return;
  }
  const usernameValidationError = validateName(username);
  if (usernameValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, usernameValidationError);
    return;
  }

//   emailConfirmed,
  if (emailConfirmed == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.EMAIL_CONFIRMED_IS_NOT_PROVIDED,);
    return;
  }
  const emailConfirmedValidationError = validateBinary(emailConfirmed);
  if(emailConfirmedValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, emailConfirmedValidationError);
    return;
  }

//   profilePic,
  if (profilePic == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.PROFILE_PIC_IS_NOT_PROVIDED,);
    return;
  }

//   bio,
  if (bio == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.BIO_IS_NOT_PROVIDED,);
    return;
  }

// userActivitionStatusId,
  if (userActivitionStatusId == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.USER_ACTIVITION_STATUS_ID_IS_NOT_PROVIDED,);
    return;
  }
  const userActivitionStatusIdValidationError = validateId(userActivitionStatusId);
  if(userActivitionStatusIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, userActivitionStatusIdValidationError);
    return;
  }

  //country id
  if (countryId == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.COUNTRY_ID_IS_NOT_PROVIDED,);
    return;
  }
  const countryIdValidationError = validateId(countryId);
  if(countryIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, countryIdValidationError);
    return;
  }

  //role id
  if (roleId == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.ROLE_ID_IS_NOT_PROVIDED,);
    return;
  }
  const roleIdValidationError = validateId(roleId);
  if(roleIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, roleIdValidationError);
    return;
  }

  //userSubCategoryId
  if (userSubCategoryId == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.USER_SUB_CATEGORY_ID_IS_EMPTY,);
    return;
  }
  const userSubCategoryIdValidationError = validateId(userSubCategoryId);
  if(userSubCategoryIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, userSubCategoryIdValidationError);
    return;
  }

  //currencyId
  if (currencyId == null) {
    resError(res, 500, titles.UPDATE_PROFILE, errors.CURRENCY_NOT_SUPPORTED_FOR_PAYMENT,);
    return;
  }
  const currencyIdValidationError = validateId(currencyId);
  if(currencyIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, currencyIdValidationError);
    return;
  }

  //languageId
  if (languageId == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.LANGUAGE_ID_IS_EMPTY,);
    return;
  }
  const languageIdValidationError = validateId(languageId);
  if(languageIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, languageIdValidationError);
    return;
  }

  //jobId
  if (jobId == null) {
    resError(res,500,titles.UPDATE_PROFILE,errors.JOB_ID_IS_EMPTY,);
    return;
  }
  const jobIdValidationError = validateId(jobId);
  if(jobIdValidationError.length > 0) {
    resError(res, 500, titles.UPDATE_PROFILE, jobIdValidationError);
    return;
  }

  // input sanitization
  const idSanitized = sanitize(id);
  const emailSanitized = sanitize(email);
  const firstNameSanitized = sanitize(firstName);
  const lastNameSanitized = sanitize(lastName);
  const contractNameSanitized = sanitize(contractName);
  const passwordSanitized = sanitize(password);
  const mobileNumberSanitized = sanitize(mobileNumber);
  const phoneNumberSanitized = sanitize(phoneNumber);
  const faxNumberSanitized = sanitize(faxNumber);
  const homePageSanitized = sanitize(homePage);
  const vatIdSanitized = sanitize(vatId);
  const roleIdSanitized = sanitize(roleId);
  const psnSanitized = sanitize(psn);
  const dateOfBirthSanitized = sanitize(dateOfBirth);
  const discountSanitized = sanitize(discount);
  const usernameSanitized = sanitize(username);
  const emailConfirmedSanitized = sanitize(emailConfirmed);
  const profilePicSanitized = sanitize(profilePic);
  const userActivitionStatusIdSanitized = sanitize(userActivitionStatusId);
  const currencyIdSanitized = sanitize(currencyId);
  const userSubCategoryIdSanitized = sanitize(userSubCategoryId);
  const languageIdSanitized = sanitize(languageId);
  const jobIdSanitized = sanitize(jobId);
  const countryIdSanitized = sanitize(countryId);
  const bioSanitized = sanitize(bio);
  

    let err;
    let user;
    let selectedUser;

    //user who requested for detail of selected user
    [err, user] = await to(
        User.findOne({
            where: {id:req.user.id}
        }));
    if (err) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
        return;
    }


    //selected user
    [err, selectedUser] = await to(
        User.findOne({
            where: {id:id}
        }));
    if (err) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
        return;
    }
    if(!selectedUser) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.USER_PROFILE_NOT_FOUND);
        return;
    }

    // check that access is denied or not
    if((user.roleId >= selectedUser.roleId) && (user.id != selectedUser.id)) {
        resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
        return;
    }

    let emailConfirmedBoolSanitized = (emailConfirmedSanitized == 0) ? false: true;

    if((user.id == selectedUser.id) && 
    ((emailConfirmedBoolSanitized != selectedUser.emailConfirmed) || 
    (userActivitionStatusIdSanitized != selectedUser.userActivitionStatusId) ||
    (Number(parseFloat(discountSanitized).toFixed(3)) != Number(parseFloat(selectedUser.discount).toFixed(3))) ||
    (roleIdSanitized != selectedUser.roleId) ||
    (userSubCategoryIdSanitized != selectedUser.userSubCategoryId))){
        resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
        return;
    }
    
    

    const oldPassword = selectedUser.password;

    selectedUser.id= idSanitized;
    selectedUser.firstName= firstNameSanitized;
    if(passwordSanitized != '')
        selectedUser.password= User.generateHash(passwordSanitized)
    selectedUser.lastName=lastNameSanitized;
    selectedUser.contractName=contractNameSanitized;
    selectedUser.phoneNumber=phoneNumberSanitized;
    selectedUser.mobileNumber=mobileNumberSanitized;
    selectedUser.faxNumber=faxNumberSanitized;
    selectedUser.homePage=homePageSanitized;
    selectedUser.vatId=vatIdSanitized;  
    selectedUser.psn=psnSanitized;
    // selectedUser.dateOfBirth=dateOfBirthSanitized;
    selectedUser.discount=discountSanitized;
    selectedUser.email=emailSanitized;
    selectedUser.username=usernameSanitized;
    selectedUser.emailConfirmed=emailConfirmedSanitized;
    selectedUser.profilePic=profilePicSanitized;
    selectedUser.bio=bioSanitized;
    selectedUser.roleId=roleIdSanitized;
    selectedUser.userSubCategoryId=userSubCategoryIdSanitized;
    selectedUser.userActivitionStatusId=userActivitionStatusIdSanitized;
    selectedUser.currencyId=currencyIdSanitized;
    selectedUser.languageId=languageIdSanitized;
    selectedUser.jobId=jobIdSanitized;
    selectedUser.countryId=countryIdSanitized;


    [err] = await to(selectedUser.save());
    if (err) {
        resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
        return;
    }

    res.status(200).json({message: "User profile changed successfully"});
    return;
};

export default setUserDetail;
