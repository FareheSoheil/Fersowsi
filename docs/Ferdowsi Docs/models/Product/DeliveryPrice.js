import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const DeliveryPrice = Model.define(
  'DeliveryPrice',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // productPeriodPriceId: {
    //   type: DataType.INTEGER(11),
    // },
    // zoneId: {
    //   type: DataType.INTEGER(4),
    // },
    // deliveryTypeId: {
    //   type: DataType.INTEGER(2),
    // },
    deliveryPrice: {
      type: DataType.DECIMAL(21,9),
    },
  }
);

export const initialize = async () => {};
export default DeliveryPrice;
