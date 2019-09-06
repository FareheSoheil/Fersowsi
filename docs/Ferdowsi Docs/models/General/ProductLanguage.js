import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductLanguage = Model.define(
  'ProductLanguage',
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
    name:'English'
  });
  data.push({
    id:2,
    name:'Swedish'
  });
  data.push({
    id:3,
    name:'Persian'
  });
  data.push({
    id:4,
    name:'Arabic'
  });

  const [err] = await to(
    ProductLanguage.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to ProductLanguage table: `, err);
  } else {
    console.warn(`initial rows added to ProductLanguage table successfully.`);
  }
};
export default ProductLanguage;
