import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const CustomerOrder = Model.define(
  'CustomerOrder',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // userId: {
    //   type: DataType.INTEGER(11),
    // },
    // actionUserId: {
    //   type: DataType.INTEGER(11),
    // },
    // deliveryAddressId:{
    //   type: DataType.INTEGER(11),
    // },
    totalTaxCost:{
      type: DataType.DECIMAL(21,9),
    },
    totalDeliveryCost:{
      type: DataType.DECIMAL(21,9),
    },
    totalCost:{
      type: DataType.DECIMAL(21,9),
    },
    totalPrice:{
      type: DataType.DECIMAL(21,9),
    },
    seenByCustomerThisStatusChange:{
      type:DataType.BOOLEAN
    },
    seenByAdminThisStatusChange:{
      type:DataType.BOOLEAN
    },
    // paymentToAdminByCustomerStatusId:{
    //   type: DataType.INTEGER(3)
    // },
    paymentvalueByCustomer:{
      type: DataType.DECIMAL(21,9),
    }
  }
);

export const initialize = async () => {};
export default CustomerOrder;
