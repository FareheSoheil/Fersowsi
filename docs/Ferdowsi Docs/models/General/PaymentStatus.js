import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const PaymentStatus = Model.define(
  'PaymentStatus',
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
    name:'Full Payment'
  });
  data.push({
    id:2,
    name:'Partial Payment'
  });
  data.push({
    id:3,
    name:'No Payment'
  });

  const [err] = await to(
    PaymentStatus.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to PaymentStatus table: `, err);
  } else {
    console.warn(`initial rows added to PaymentStatus table successfully.`);
  }
};
export default PaymentStatus;
