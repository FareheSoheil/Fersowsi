import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductContentTranslation = Model.define(
  'ProductContentTranslation',
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
    // languageId: {
    //   type: DataType.INTEGER(3),
    // },
    title: {
      type: DataType.STRING(100),
    },
    description: {
      type: DataType.STRING(1000),
    },
  }
);

export const initialize = async () => {};
export default ProductContentTranslation;
