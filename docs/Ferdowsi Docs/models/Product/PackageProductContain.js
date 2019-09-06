import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const PackageProductContain = Model.define(
  'PackageProductContain',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // packageProductId: {
    //   type: DataType.INTEGER(11),
    // },
    // singleProductId: {
    //   type: DataType.INTEGER(11),
    // },
  }
);

export const initialize = async () => {};
export default PackageProductContain;
