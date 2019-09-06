import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductContentCategory = Model.define(
  'ProductContentCategory',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // productId: {
    //   type: DataType.INTEGER(11),
    // },
    // productContentTypeId: {
    //   type: DataType.INTEGER(4),
    // },
  }
);

export const initialize = async () => {};
export default ProductContentCategory;
