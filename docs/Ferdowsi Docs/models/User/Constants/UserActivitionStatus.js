import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const UserActivitionStatus = Model.define(
  'UserActivitionStatus',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(20),
    },
  }
);

export const initialize = async () => {
  const data = [];
  data.push({
    id:1,
    name:'waitForApprove'
  });
  data.push({
    id:2,
    name:'activate'
  });
  data.push({
    id:3,
    name:'deactivate'
  });

  const [err] = await to(
    UserActivitionStatus.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to UserActivitionStatus table: `, err);
  } else {
    console.warn(`initial rows added to UserActivitionStatus table successfully.`);
  }
};

export default UserActivitionStatus;
