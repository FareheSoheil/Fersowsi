import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductPeriod = Model.define(
  'ProductPeriod',
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
    name:'Daily'
  });
  data.push({
    id:2,
    name:'Weekly'
  });
  data.push({
    id:3,
    name:'TwoWeekly'
  });
  data.push({
    id:4,
    name:'ThreeWeekly'
  });
  data.push({
    id:5,
    name:'Monthly'
  });
  data.push({
    id:6,
    name:'SixMonthly'
  });
  data.push({
    id:7,
    name:'Yearly'
  });

  const [err] = await to(
    ProductPeriod.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to ProductPeriod table: `, err);
  } else {
    console.warn(`initial rows added to ProductPeriod table successfully.`);
  }
};
export default ProductPeriod;
