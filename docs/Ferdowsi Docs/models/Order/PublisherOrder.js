import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const PublisherOrder = Model.define(
  'PublisherOrder',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // customerOrderId: {
    //   type: DataType.INTEGER(11),
    // },
    // productId: {
    //   type: DataType.INTEGER(11),
    // },
    count:{
      type: DataType.INTEGER(6),
    },
    availableCount:{
      type: DataType.INTEGER(6),
    },
    startDate:{
      type: DataType.DATE,
    },
    endDate:{
      type: DataType.DATE,
    },
    cancelPrice:{
      type: DataType.DECIMAL(21,9),
    },
    // publisherOrderStatusId:{
    //   type: DataType.INTEGER(3),
    // },
    seenByPublisherThisStatusChange:{
      type:DataType.BOOLEAN
    },
    seenByAdminThisStatusChange:{
      type:DataType.BOOLEAN
    },
    // paymentToPublisherByAdminStatusId:{
    //   type: DataType.INTEGER(3)
    // },
    paymentvalueByAdmin:{
      type: DataType.DECIMAL(21,9),
    }
  }
);

export const initialize = async () => {};
export default PublisherOrder;
