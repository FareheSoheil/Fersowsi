import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const LandingPage = Model.define(
  'LandingPage',
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
  }
);

export const initialize = async () => {};
export default LandingPage;
