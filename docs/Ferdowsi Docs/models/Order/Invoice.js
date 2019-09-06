import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Invoice = Model.define(
  'Invoice',
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
    contentHtml: {
      type: DataType.STRING(500),
    },
    imageAddress:{
      type: DataType.STRING(500),
    },
  }
);

export const initialize = async () => {};
export default Invoice;
