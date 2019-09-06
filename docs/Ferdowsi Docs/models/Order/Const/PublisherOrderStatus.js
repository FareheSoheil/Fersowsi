import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const PublisherOrderStatus = Model.define(
  'PublisherOrderStatus',
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
    name:'Delayed'
  });
  data.push({
    id:2,
    name:'Deflicted'
  });
  data.push({
    id:3,
    name:'Cancel'
  });
  data.push({
    id:4,
    name:'Accept'
  });
  data.push({
    id:5,
    name:'Sent'
  });
  data.push({
    id:6,
    name:'Delivered'
  });

  const [err] = await to(
    PublisherOrderStatus.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to PublisherOrderStatus table: `, err);
  } else {
    console.warn(`initial rows added to PublisherOrderStatus table successfully.`);
  }
};
export default PublisherOrderStatus;
