import DataType, { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import to from 'await-to-js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Model from '../../sequelize';
import config from '../../config';
// import { initialize as initializeUser } from '../utils';

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataType.STRING(50),
      defaultValue: false,
    },
    lastName: {
      type: DataType.STRING(50),
      defaultValue: false,
    },
    contractName: {
      type: DataType.STRING(50),
      defaultValue: false,
    },
    phoneNumber: {
      type: DataType.STRING(25),
      defaultValue: false,
    },
    mobileNumber: {
      type: DataType.STRING(25),
      defaultValue: false,
    },
    faxNumber: {
      type: DataType.STRING(25),
      defaultValue: false,
    },
    homePage: {
      type: DataType.STRING(500),
      defaultValue: false,
    },
    vatId: {
      type: DataType.STRING(25),
      defaultValue: false,
    },
    psn: {
      type: DataType.STRING(25),
      defaultValue: false,
    },
    dateOfBirth: {
      type: DataType.DATE,
    },
    discount: {
      type: DataType.DECIMAL(5, 2),
      defaultValue: 0,
    },

    // roleId: {
    //   type: DataType.INTEGER(3),
    // },
    // userSubCategoryId: {
    //   type: DataType.INTEGER(3),
    // },
    // userActivitionStatusId: {
    //   type: DataType.INTEGER(3),
    // },
    // currencyId: {
    //   type: DataType.INTEGER(5),
    // },
    // languageId: {
    //   type: DataType.INTEGER(5),
    // },
    // jobId: {
    //   type: DataType.INTEGER(5),
    // },
    // countryId: {
    //   type: DataType.INTEGER(5),
    // },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },
    username: {
      type: DataType.STRING(255),
    },
    password: {
      type: DataType.STRING(100),
    },

    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },

    emailConfirmationToken: {
      type: DataType.STRING(64),
      allowNull: true,
      defaultValue() {
        return crypto.randomBytes(32).toString('hex');
      },
    },
    emailConfirmationTokenCreatedAt: {
      type: DataType.DATE,
      allowNull: true,
    },

    resetPasswordToken: {
      type: DataType.STRING(64),
      allowNull: true,
      defaultValue() {
        return crypto.randomBytes(32).toString('hex');
      },
    },
    resetPasswordTokenCreatedAt: {
      type: DataType.DATE,
      allowNull: true,
    },

    profilePic: {
      type: DataType.STRING(500),
    },

    bio: {
      type: DataType.STRING(500),
    },
  },
  {
    charset: 'utf8mb4',
    indexes: [{ fields: ['email'] }],
  },
);

// generating a hash
User.generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
User.validPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

// checking if password is valid
User.getToken = user => {
  const expirationTime = config.auth.jwt.expiration;
  return jwt.sign({ id: user.id }, config.auth.jwt.secret, {
    expiresIn: expirationTime,
  });
};

export const initialize = async () => {
  const superAdmin = [
    {
      id: 1,
      contractName: 'Ferdosi',
      userCategoryId: 1,
      userSubCategoryId: 1,
      userActivitionStatusId: 1,
      currencyId: 1,
      languageId: 1,
      jobId: 1,
      roleId:1,
      email: 'mr@ferdosi.com',
      username: 'admin',
      password: bcrypt.hashSync('Mehdi!23@#', bcrypt.genSaltSync(8), null),
      emailConfirmed: true,
    },
  ];

  const [err] = await to(
    User.bulkCreate(superAdmin),
  );

  if (err) {
    console.warn(`problem with adding initial data to User table: `, err);
  } else {
    console.warn(`initial rows added to User table successfully.`);
  }
};

export default User;
