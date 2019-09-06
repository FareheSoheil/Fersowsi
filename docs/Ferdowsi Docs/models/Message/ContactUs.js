import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const ContactUs = Model.define(
  'ContactUs',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataType.STRING(50),
    },
    lastName: {
      type: DataType.STRING(50),
    },
    phoneNumber: {
      type:DataType.STRING(30)
    },
    // countryId: {
    //   type:DataType.INTEGER(5)
    // },
    email: {
      type:DataType.STRING(100),
    },
    text: {
      type:DataType.STRING(1000),
    },
    isSeen: {
      type:DataType.BOOLEAN
    },
  }
);

export const initialize = async () => {};
export default ContactUs;
