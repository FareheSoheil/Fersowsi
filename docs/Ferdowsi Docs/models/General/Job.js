import DataType, { Op } from 'sequelize';
import Model from '../../sequelize';
import to from 'await-to-js';


const Job = Model.define(
  'Job',
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
    name:'executive/managerial'
  });
  data.push({
    id:2,
    name:'professional (doctor, lawyer, etc.)'
  });
  data.push({
    id:3,
    name:'academic/educator'
  });
  data.push({
    id:4,
    name:'computer technical/engineering'
  });
  data.push({
    id:5,
    name:'other technical/engineering'
  });
  data.push({
    id:6,
    name:'service/customr support'
  });
  data.push({
    id:7,
    name:'clerical/administrative'
  });
  data.push({
    id:8,
    name:'sales/marketing'
  });
  data.push({
    id:9,
    name:'tradesman/craftsman'
  });
  data.push({
    id:10,
    name:'college/graduate student'
  });
  data.push({
    id:11,
    name:'K-12 student'
  });
  data.push({
    id:12,
    name:'homemaker'
  });
  data.push({
    id:13,
    name:'self-employed/own company'
  });
  data.push({
    id:14,
    name:'unemployed, looking for work'
  });
  data.push({
    id:15,
    name:'retired'
  });
  data.push({
    id:16,
    name:'other'
  });

  const [err] = await to(
    Job.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to Job table: `, err);
  } else {
    console.warn(`initial rows added to Job table successfully.`);
  }
};

export default Job;
