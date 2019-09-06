import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Basket = Model.define(
  'Basket',
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
    // productId: {
    //   type: DataType.INTEGER(11),
    // },
  }
);

export const initialize = async () => {};
export default Basket;
