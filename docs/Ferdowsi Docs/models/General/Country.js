import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Country = Model.define(
  'Country',
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
    niceName: {
      type: DataType.STRING(50),
      allowNull: true
    },
    iso:{
      type: DataType.STRING(2),
      allowNull: true
    },
    iso3:{
      type: DataType.STRING(3),
      allowNull: true
    },
    numcode: {
      type: DataType.INTEGER(6),
      allowNull: true
    },
    phonecode: {
      type: DataType.INTEGER(6),
      allowNull: false
    },
  }
);

export const initialize = async () => {
  const data = [];
  data.push({
    id:1,
    name:'AFGHANISTAN',
    niceName: 'Afghanistan',
    iso: 'AF',
    iso3: 'AFG',
    numcode: 4,
    phonecode: 93
  });
  data.push({
    id:2,
    name:'ALBANIA',
    niceName: 'Albania',
    iso: 'AL',
    iso3: 'ALB',
    numcode: 8,
    phonecode: 355
  });

  const [err] = await to(
    Country.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to Country table: `, err);
  } else {
    console.warn(`initial rows added to Country table successfully.`);
  }
};

export default Country;
