import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Claim = Model.define(
  'Claim',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    messageHtml: {
      type: DataType.STRING(10000),
    },
    // senderUserId: {
    //   type:DataType.INTEGER(11)
    // },
    // receiverUserId: {
    //   type:DataType.INTEGER(11)
    // },
    // actionUserId: {
    //   type:DataType.INTEGER(11)
    // },
    // repliedMessageId: {
    //   type:DataType.INTEGER(11)
    // },
    // customerOrderId: {
    //   type:DataType.INTEGER(11)
    // },
    // messageStatusId: {
    //   type:DataType.INTEGER(3)
    // },
    // acceptedAdminId: {
    //   type:DataType.INTEGER(11)
    // },
    isFinished:{
      type:DataType.BOOLEAN
    },
    imageAddress: {
      type: DataType.STRING(300)
    }
  }
);

export const initialize = async () => {};
export default Claim;
