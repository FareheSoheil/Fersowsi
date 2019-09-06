import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const MessageStatus = Model.define(
  'MessageStatus',
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
    name:'SeenByAdmin'
  });
  data.push({
    id:2,
    name:'Rejected'
  });
  data.push({
    id:3,
    name:'Accepted'
  });
  data.push({
    id:4,
    name:'Pending'
  });

  const [err] = await to(
    MessageStatus.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to MessageStatus table: `, err);
  } else {
    console.warn(`initial rows added to MessageStatus table successfully.`);
  }
};
export default MessageStatus;
