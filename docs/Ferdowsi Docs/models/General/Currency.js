import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Currency = Model.define(
  'Currency',
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
    abbr: {
      type:DataType.STRING(10),
    },
    usdRatio: {
      type: DataType.DECIMAL(21,9),
      allowNull: false
    },
    isAutomatic: {
      type: DataType.BOOLEAN,
    }
  }
);

export const initialize = async () => {
  const data = [];
  data.push({
    id:1,
    name:'Euro',
    abbr:'E',
    usdRatio: 1.13,
    isAutomatic: true
  });
  data.push({
    id:2,
    name:'USD',
    abbr:'U',
    usdRatio: 1,
    isAutomatic: false
  });
  data.push({
    id:3,
    name:'Krona',
    abbr:'SEK',
    usdRatio: 0.1,
    isAutomatic: true
  });
  data.push({
    id:4,
    name:'Rial',
    abbr:'R',
    usdRatio: 0.000008475,
    isAutomatic: false
  });

  const [err] = await to(
    Currency.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to Currency table: `, err);
  } else {
    console.warn(`initial rows added to Currency table successfully.`);
  }
};
export default Currency;
