import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Address = Model.define(
  'Address',
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
    countyId: {
      type: DataType.INTEGER(11),
    },
    province: {
      type: DataType.STRING(100),
    },
    city: {
      type: DataType.STRING(30),
    },
    detailAddress: {
      type: DataType.STRING(30),
    }
  }
);

export const initialize = async () => {};


export default Address;
