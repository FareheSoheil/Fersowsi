import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Role = Model.define(
  'Role',
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
    name:'SuperAdmin'
  });
  data.push({
    id:2,
    name:'Operator'
  });
  data.push({
    id:3,
    name:'Publisher'
  });
  data.push({
    id:4,
    name:'Customer'
  });

  const [err] = await to(
    Role.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to Role table: `, err);
  } else {
    console.warn(`initial rows added to Role table successfully.`);
  }
};

export default Role;
