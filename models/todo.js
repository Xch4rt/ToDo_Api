'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDo.belongsTo(models.User,{
        foreignKey: "userId",
        as: "user"
      }),
      ToDo.hasMany(models.Task, {
        foreignKey: "todoId",
        as: "tasks"
      })
    }
  }
  ToDo.init({
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      references: {
        model: "User",
        key: "id"
      }
    },
    name: DataTypes.STRING,
    isFinished: DataTypes.BOOLEAN,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true}
  }, {
    sequelize: sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};