import DataType, { Op } from 'sequelize';
import Model from '../../sequelize';
import to from 'await-to-js';


const UserSubCategory = Model.define(
  'UserSubCategory',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(50),
    },
  }
);

export const initialize = async () => {
  const data = [];
  data.push({
    id:1,
    name:'Library'
  });
  data.push({
    id:2,
    name:'Goverment'
  });
  data.push({
    id:3,
    name:'School'
  });
  data.push({
    id:4,
    name:'Corporation'
  });
  data.push({
    id:5,
    name:'SingleCustomer'
  });
  data.push({
    id:6,
    name:'Private'
  });
  data.push({
    id:7,
    name:'Public'
  });
  data.push({
    id:8,
    name:'SuperAdmin'
  });
  data.push({
    id:9,
    name:'Operator'
  });

  const [err] = await to(
    UserSubCategory.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to UserSubCategory table: `, err);
  } else {
    console.warn(`initial rows added to UserSubCategory table successfully.`);
  }
};

export default UserSubCategory;
