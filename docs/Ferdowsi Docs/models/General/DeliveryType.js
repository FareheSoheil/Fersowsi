import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const DeliveryType = Model.define(
  'DeliveryType',
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
    name:'Air Mail'
  });
  data.push({
    id:2,
    name:'Surface Mail'
  });

  const [err] = await to(
    DeliveryType.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to DeliveryType table: `, err);
  } else {
    console.warn(`initial rows added to DeliveryType table successfully.`);
  }
};
export default DeliveryType;
