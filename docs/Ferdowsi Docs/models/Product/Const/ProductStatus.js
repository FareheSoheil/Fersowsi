import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductStatus = Model.define(
  'ProductStatus',
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
    name:'WaitForAcceptByAdmin'
  });
  data.push({
    id:2,
    name:'Ready'
  });
  data.push({
    id:3,
    name:'NotAvailable'
  });

  const [err] = await to(
    ProductStatus.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to ProductStatus table: `, err);
  } else {
    console.warn(`initial rows added to ProductStatus table successfully.`);
  }
};
export default ProductStatus;
