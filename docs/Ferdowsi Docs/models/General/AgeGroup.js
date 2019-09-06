import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const AgeGroup = Model.define(
  'AgeGroup',
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
    name:'Child'
  });
  data.push({
    id:2,
    name:'Teenager'
  });
  data.push({
    id:3,
    name:'Young'
  });
  data.push({
    id:4,
    name:'Adult'
  });

  const [err] = await to(
    AgeGroup.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to AgeGroup table: `, err);
  } else {
    console.warn(`initial rows added to AgeGroup table successfully.`);
  }
};
export default AgeGroup;
