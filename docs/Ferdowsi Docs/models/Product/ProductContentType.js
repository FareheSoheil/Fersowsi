import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ProductContentType = Model.define(
  'ProductContentType',
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
  data.push({ name:'Political&Social' });
  data.push({ name:'Cultural' });
  data.push({ name:'Sport' });
  data.push({ name:'Academic' });
  data.push({ name:'Economic&Finance' });
  data.push({ name:'General' });
  data.push({ name:'Literal' });
  data.push({ name:'Children' });
  data.push({ name:'Scintefic & Technical' });
  data.push({ name:'Woman' });
  data.push({ name:'Family' });
  data.push({ name:'Satirical&Critical' });
  data.push({ name:'Iranian Studies' });
  data.push({ name:'Middle Eastern Studies' });
  data.push({ name:'Centeral Asian Studies' });
  data.push({ name:'Afghanistan' });
  data.push({ name:'Kurdish Studies' });
  data.push({ name:'Games' });
  data.push({ name:'Islamic Studies' });
  data.push({ name:'Millitary Defence' });
  data.push({ name:'IT-Computer' });
  data.push({ name:'Philosophy and Logic' });
  data.push({ name:'Arts, Photos, paintings' });
  data.push({ name:'Movie Theater' });
  data.push({ name:'Psychology' });
  data.push({ name:'Statistics' });
  data.push({ name:'Law' });
  data.push({ name:'Computer' });
  data.push({ name:'Travel & Tourism' });
  data.push({ name:'Crosswords and Entertainment' });
  data.push({ name:'Cooking and Housekeeping' });
  data.push({ name:'Medical' });
  data.push({ name:'Education and training' });
  data.push({ name:'Language' });
  data.push({ name:'Daily Newspaper' });
  data.push({ name:'journals' });
  data.push({ name:'Music' });
  data.push({ name:'Nature' });
  data.push({ name:'Electronic' });
  data.push({ name:'Magazine' });
  data.push({ name:'Weekly newspaper' });
  data.push({ name:'Multilingual' });
  data.push({ name:'Arab Studies' });
  data.push({ name:'Dressmaking' });
  data.push({ name:'Sticking' });
  data.push({ name:'Antiques' });
  data.push({ name:'Labor' });
  data.push({ name:'Architecture' });
  data.push({ name:'Branch magazines' });
  data.push({ name:'Adoption' });
  data.push({ name:'Organisation Press' });
  data.push({ name:'Neuropsychiatric disorders' });
  data.push({ name:'ADHD (Attention deficit hyperactivity disorder)' });
  data.push({ name:'People with hearing impairment' });
  data.push({ name:'Patient Journals' });
  data.push({ name:'Comic magazines' });
  data.push({ name:'Feminism' });
  data.push({ name:'Equality' });
  data.push({ name:'Restaurants' });
  data.push({ name:'Books' });
  data.push({ name:'Cartoons' });
  data.push({ name:'Political Party Press' });
  data.push({ name:'Fashion and style' });
  data.push({ name:'Popular press' });
  data.push({ name:'Anarchism' });
  data.push({ name:'Local Heritage Care' });
  data.push({ name:'Construction Equipment' });
  data.push({ name:'Special Publications' });
  data.push({ name:'Boats' });
  data.push({ name:'Lifestyle' });
  data.push({ name:'Civil defense' });
  data.push({ name:'Interior decoration' });
  data.push({ name:'Motorcycles' });
  data.push({ name:'Religion' });
  data.push({ name:'Union organizations' });
  data.push({ name:'Healthcare' });
  data.push({ name:'Media and journalism' });
  data.push({ name:'Animals' });
  data.push({ name:'Local News' });
  data.push({ name:'Fishing and Hunting'});

  const [err] = await to(
    ProductContentType.bulkCreate(data),
  );

  if (err) {
    console.warn(`problem with adding initial data to ProductContentType table: `, err);
  } else {
    console.warn(`initial rows added to ProductContentType table successfully.`);
  }
};
export default ProductContentType;
