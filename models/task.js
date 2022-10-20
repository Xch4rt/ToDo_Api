'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.ToDo, {
        foreignKey: "todoId",
        as: "todo"
      })
    }
  }
  Task.init({
    todoId: { 
      type: DataTypes.INTEGER,
      field:"todo_id",
      references: {
        model: "ToDo",
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
    modelName: 'Task',
  });
  return Task;
};