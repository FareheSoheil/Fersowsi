import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Comment = Model.define(
  'Comment',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataType.STRING(1000),
    },
    // productId: {
    //   type:DataType.INTEGER(11)
    // },
    // userId: {
    //   type:DataType.INTEGER(11)
    // },
    // actionUserId: {
    //   type:DataType.INTEGER(11)
    // },
    // repliedCommentId: {
    //   type:DataType.INTEGER(11)
    // },
    // messageStatusId: {
    //   type:DataType.INTEGER(3)
    // },
  }
);

export const initialize = async () => {};
export default Comment;
