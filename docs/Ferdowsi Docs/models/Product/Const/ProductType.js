import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductType = Model.define(
  'ProductType',
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
    name:'SingleProduct'
  });
  data.push({
    id:2,
    name:'Package'
  });

  const [err] = await to(
    ProductType.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to ProductType table: `, err);
  } else {
    console.warn(`initial rows added to ProductType table successfully.`);
  }
};
export default ProductType;
