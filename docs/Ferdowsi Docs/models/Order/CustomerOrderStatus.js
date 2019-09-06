import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const CustomerOrderStatus = Model.define(
  'CustomerOrderStatus',
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
    name:'Wait For Admin Response'
  });
  data.push({
    id:2,
    name:'Admin Rejected'
  });
  data.push({
    id:3,
    name:'Admin Suspend'
  });
  data.push({
    id:4,
    name:'Admin Edited'
  });
  data.push({
    id:5,
    name:'Sent E-Factor'
  });
  data.push({
    id:6,
    name:'Payment Done'
  });
  data.push({
    id:7,
    name:'Publisher Order Created'
  });
  data.push({
    id:8,
    name:'delivered'
  });

  const [err] = await to(
    CustomerOrderStatus.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to CustomerOrderStatus table: `, err);
  } else {
    console.warn(`initial rows added to CustomerOrderStatus table successfully.`);
  }
};
export default CustomerOrderStatus;
