const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Vote extends Model {}


Vote.init({
    id: {
        type: DataTypes.BOOLEAN,
        primaryKey: true
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote'
});
module.exports = Comment;