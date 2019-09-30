import to from 'await-to-js';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import {  CustomerOrder } from '../../models';
import {
  validateId,
  validateName,
  validateFloatNumber,
  validateBinary
} from '../../validation';
import sanitize from '../../sanitization';


const addCustomerOrder = async (req, res) => {
  const { 
      newUserId,
      newActionUserId,
      newDeliveryAddressId,
      newTotalTaxCost,
      newTotalDeliveryCost,
      newTotalCost,
      newTotalPrice,
      newPaymentToAdminByCustomerStatusId,
      newPaymentvalueByCustomer,
       } = req.body;

  // Input validation
 
  if (newUserId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.USER_ID_IS_NOT_PROVIDED);
    return;
  }
  const newUserIdValidationError = validateId(newUserId);
  if (newUserIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newUserIdValidationError);
    return;
  }

  if (newDeliveryAddressId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DETAILL_ADDRESS_IS_NOT_PROVIDED);
    return;
  }

  const newDeliveryAddressIdValidationError = validateId(newDeliveryAddressId);
  if (newDeliveryAddressIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newDeliveryAddressIdValidationError);
    return;
  }

  if (newTotalTaxCost == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.TOTAL_TAX_COST_IS_NOT_PROVIDED);
    return;
  }

  const newTotalTaxCostValidationError = validateId(newTotalTaxCost);
  if (newTotalTaxCostValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newTotalTaxCostValidationError);
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

  if (newTotalDeliveryCost == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.TOTAL_DELIVERY_COST_IS_NOT_PROVIDED);
    return;
  }
  const newTotalDeliveryCostValidationError = validateId(newTotalDeliveryCost);
  if (newTotalDeliveryCostValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newTotalDeliveryCostValidationError);
    return;
  }


  if (newTotalCost == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.TOTAL_COST_IS_NOT_PROVIDED);
    return;
  }

  const newTotalCostValidationError = validateId(newTotalCost);
  if (newTotalCostValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newTotalCostValidationError);
    return;
  }

  if (newTotalPrice == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.TOTAL_PRICE_NOT_PROVIDED);
    return;
  }
  const newTotalPriceValidationError = validateId(newTotalPrice);
  if (newTotalPriceValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newTotalPriceValidationError);
    return;
  }

  if (newPaymentToAdminByCustomerStatusId == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.PAYMENT_TO_ADMIN_BY_CUSTOMER_IS_NOT_PROVIDED);
    return;
  }
  const newPaymentToAdminByCustomerStatusIdValidationError = validateId(newPaymentToAdminByCustomerStatusId);
  if (newPaymentToAdminByCustomerStatusIdValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newPaymentToAdminByCustomerStatusIdValidationError);
    return;
  }

  if (newPaymentvalueByCustomer == null) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.TOTAL_PRICE_NOT_PROVIDED);
    return;
  }
  const newPaymentvalueByCustomerValidationError = validateId(newPaymentvalueByCustomer);
  if (newPaymentvalueByCustomerValidationError.length > 0) {
    resError(res, 500, titles.FETCH_STATE_ERROR, newPaymentvalueByCustomerValidationError);
    return;
  }
 
  
  // input sanitization
  const customerOrderId = sanitize(customerOrderId);
  const newUserIdSanitized = sanitize(newUserId);
  const newActionUserIdSanitized = sanitize(newActionUserId);
  const newDeliveryAddressIdSanitized = sanitize(newDeliveryAddressId);
  const newTotalTaxCostSanitized = sanitize(newTotalTaxCost);
  const newTotalDeliveryCostSanitized = sanitize(newTotalDeliveryCost);
  const newTotalCostSanitized = sanitize(newTotalCost);
  const newTotalPriceSanitized = sanitize(newTotalPrice);
  const newPaymentToAdminByCustomerStatusIdSanitized = sanitize(newPaymentToAdminByCustomerStatusId);
  const newPaymentvalueByCustomerSanitized = sanitize(newPaymentvalueByCustomer);

  let err;
  let user;
  let customerOrder;
  
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

   
    [err] = await to(
      CustomerOrder.create(
        {
  
          userId : newUserIdSanitized,
          deliveryAddressId : newDeliveryAddressIdSanitized,
          actionUserId : newActionUserIdSanitized,
          totalTaxCost : newTotalTaxCostSanitized,
          totalDeliveryCost : newTotalDeliveryCostSanitized,
          totalCost : newTotalCostSanitized,
          totalPrice : newTotalPriceSanitized,
          paymentToAdminByCustomerStatusId : newPaymentToAdminByCustomerStatusIdSanitized,
          paymentvalueByCustomer : newPaymentvalueByCustomerSanitized,
        }
      )
      );
    
      if (err) {
      resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
      return;
    }

    res.status(200).json({message: 'customer order is inserted'});
    return;
  }
  else {
    resError(res, 500, titles.ACCESS_DENIED, errors.ACCESS_DENIED_FOR_THIS_USER);
    return;
  }

};
export default addCustomerOrder;
