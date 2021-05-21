const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING[140],
            allowNull: false
        },
        // need to create short code to generate specific question numbers
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Question;