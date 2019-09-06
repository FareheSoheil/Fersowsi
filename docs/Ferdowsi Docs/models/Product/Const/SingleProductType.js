import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const SingleProductType = Model.define(
  'SingleProductType',
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
    name:'Journal'
  });
  data.push({
    id:2,
    name:'Magazine'
  });
  data.push({
    id:3,
    name:'EMagazine'
  });
  data.push({
    id:4,
    name:'ImageCollection'
  });
  data.push({
    id:5,
    name:'Archive'
  });
  data.push({
    id:6,
    name:'Catalogue'
  });

  const [err] = await to(
    SingleProductType.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to SingleProductType table: `, err);
  } else {
    console.warn(`initial rows added to SingleProductType table successfully.`);
  }
};
export default SingleProductType;
