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
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'author',
                key: 'id'
            }
        },
        // every question will have a short code
        // pending:make it unique (must build a JS function that creates and then verifies)
        shortcode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'question'
    }
);

module.exports = Question;
