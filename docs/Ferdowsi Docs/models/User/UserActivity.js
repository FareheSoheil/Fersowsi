import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const UserActivity = Model.define(
  'UserActivity',
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
    ip: {
      type: DataType.STRING(20),
    },
    location: {
      type: DataType.STRING(100),
    },
    browser: {
      type: DataType.STRING(50),
    },
    action: {
      type: DataType.STRING(100),
    },
  }
);

export const initialize = async () => {
};

export default UserActivity;
