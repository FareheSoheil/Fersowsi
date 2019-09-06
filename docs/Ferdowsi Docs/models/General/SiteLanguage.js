import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const SiteLanguage = Model.define(
  'SiteLanguage',
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

  const [err] = await to(
    SiteLanguage.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to SiteLanguage table: `, err);
  } else {
    console.warn(`initial rows added to SiteLanguage table successfully.`);
  }
};
export default SiteLanguage;
