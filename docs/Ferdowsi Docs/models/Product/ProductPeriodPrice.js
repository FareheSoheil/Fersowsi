import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductPeriodPrice = Model.define(
  'ProductPeriodPrice',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // ProductId: {
    //   type: DataType.INTEGER(11),
    // },
    // productPeriodId: {
    //   type: DataType.INTEGER(3),
    // },
    PublisherPrice: {
      type: DataType.DECIMAL(21,9),
    },
    CustomerPrice: {
      type: DataType.DECIMAL(21,9),
    },
  }
);

export const initialize = async () => {};
export default ProductPeriodPrice;
