import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, Currency, Claim } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const setClaim = async (req, res) => {
  const { 
      claimId,
      newSenderUserId,
      newReceiverUserId,
      newActionUserId,
      newRepliedMessageId,
      newCustomerOrderId,
      newMessageStatusId,
      newAcceptedAdminId,
      newImageAddress

    } = req.body;

  // Input validation
  if (claimId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CLAIM_ID_IS_NOT_PROVIDED);
    return;
  }
  const claimIdValidationError = validateId(claimId);
  if (claimIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, claimIdValidationError);
    return;
  }

  if (newSenderUserId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.SENDER_USER_ID_IS_NOT_PROVIDED);
    return;
  }
  const newSenderUserIdValidationError = validateId(newSenderUserId);
  if (newSenderUserIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newSenderUserIdValidationError);
    return;
  }
  if (newReceiverUserId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.RECEIVER_USER_ID_IS_NOT_PROVIDED);
    return;
  }

  const newReceiverUserIdValidationError = validateId(newReceiverUserId);
  if (newReceiverUserIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newReceiverUserIdValidationError);
    return;
  }

  if (newRepliedMessageId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.REPLIED_MESSAGE_ID_IS_NOT_PROVIDED);
    return;
  }

  const newRepliedMessageIdValidationError = validateId(newRepliedMessageId);
  if (newRepliedMessageIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newRepliedMessageIdValidationError);
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

  if (newCustomerOrderId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.CUSTOMER_ORDER_ID_IS_NOT_PROVIDED);
    return;
  }
  const newCustomerOrderIdValidationError = validateId(newCustomerOrderId);
  if (newCustomerOrderIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newCustomerOrderIdValidationError);
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

  if (newAcceptedAdminId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.ACCEPTED_ADMIN_ID_IS_NOT_PROVIDED);
    return;
  }
  const newAcceptedAdminIdValidationError = validateId(newAcceptedAdminId);
  if (newAcceptedAdminIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newAcceptedAdminIdValidationError);
    return;
  }

  if (newImageAddress == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.IMAGE_ADDRESS_ID_IS_NOT_PROVIDED);
    return;
  }
  const newImageAddressValidationError = validateName(newImageAddress);
  if (newImageAddressValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newImageAddressValidationError);
    return;
  }
 
  

  // input sanitization
  const claimIdSanitized = sanitize(claimId);
  const newSenderUserIdSanitized = sanitize(newsenderUserId);
  const newRepliedMessageIdSanitized = sanitize(newrepliedMessageId);
  const newReceiverUserIdSanitized = sanitize(newreceiverUserId);
  const newActionUserIdSanitized = sanitize(newactionUserId);
  const newCustomerOrderIdSanitized = sanitize(newcustomerOrderId);
  const newMessageStatusIdSanitized = sanitize(newmessageStatusId);
  const newAcceptedAdminIdSanitized = sanitize(newAcceptedAdminId);
  const newImageAddressSanitized = sanitize(newImageAddress);

  let err;
  let user;
  let claim;
  
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

    [err, claim] = await to(
      Claim.findOne({where: {id:claimIdSanitized}
      }),
    );
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    Claim.senderUserId = newSenderUserIdSanitized;
    Claim.receiverUserId = newReceiverUserIdSanitized;
    Claim.actionUserId = newActionUserIdSanitized;
    Claim.repliedMessageId = newRepliedMessageIdSanitized;
    Claim.customerOrderId = newCustomerOrderIdSanitized;
    Claim.messageStatusId = newMessageStatusIdSanitized;
    Claim.acceptedAdminId = newAcceptedAdminIdSanitized;
    Claim.imageAddress = newImageAddressSanitized;

    [err] = await to(claim.save());
    if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'Claim updated'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

  };

export default setClaim;
