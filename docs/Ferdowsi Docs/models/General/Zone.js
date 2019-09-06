import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Zone = Model.define(
  'Zone',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(30),
    },
  }
);

export const initialize = async () => {
  const data = [];
  data.push({
    id:1,
    name:'US and Canada'
  });
  data.push({
    id:2,
    name:'Europe'
  });
  data.push({
    id:3,
    name:'MiddleEast'
  });
  data.push({
    id:4,
    name:'Asia'
  });

  const [err] = await to(
    Zone.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to Zone table: `, err);
  } else {
    console.warn(`initial rows added to Zone table successfully.`);
  }
};
export default Zone;
