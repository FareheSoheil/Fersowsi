import DataType, { Op, DATE } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Product = Model.define(
  'Product',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // productTypeId:{
    //   type: DataType.INTEGER(3)
    // },
    // singleProductTypeId:{
    //   type: DataType.INTEGER(3)
    // },
    // ageGroupId:{
    //   type: DataType.INTEGER(3)
    // },
    // publishPeriodId:{
    //   type: DataType.INTEGER(3)
    // },
    // publisherId:{
    //   type: DataType.INTEGER(11)
    // },
    // languageId:{
    //   type: DataType.INTEGER(3)
    // },
    price: {
      type:DataType.DECIMAL(21,9)
    },
    discount: {
      type:DataType.DECIMAL(21,9)
    },
    tax: {
      type:DataType.DECIMAL(21,9)
    },
    issn: {
      type:DataType.STRING(30)
    },
    dewey: {
      type:DataType.STRING(30)
    },
    asb: {
      type:DataType.STRING(30)
    },
    englishTitle: {
      type:DataType.STRING(100)
    },
    englishDesc: {
      type:DataType.STRING(500)
    },
    weight: {
      type:DataType.DECIMAL(21,9)
    },
    
    coverImage: {
      type:DataType.STRING(500)
    },
    creationDate: {
      type:DataType.DATE
    },
    priceUpdatedAt: {
      type:DataType.DATE
    }

  }
);

export const initialize = async () => {
};
export default Product;
