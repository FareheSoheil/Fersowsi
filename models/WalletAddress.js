import DataType from 'sequelize';
import Model from '../sequelize';

const WalletAddress = Model.define('WalletAddress', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // tokenTypeId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  address: {
    type: DataType.STRING(64),
    allowNull: false,
  },
});

export default WalletAddress;
