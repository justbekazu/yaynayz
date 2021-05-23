const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    answer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'question',
        key: 'id'
      }
    }
}, 
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote'
});

module.exports = Vote;
