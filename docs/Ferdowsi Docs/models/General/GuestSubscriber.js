import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const DownloadHistory = Model.define(
  'DownloadHistory',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataType.INTEGER(11),
    },
    productId: {
      type: DataType.INTEGER(11),
    },
    numberOfDownload: {
      type: DataType.INTEGER(11),
    },
  }
);

export const initialize = async () => {};
export default DownloadHistory;
