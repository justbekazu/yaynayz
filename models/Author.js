const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class Author extends Model {
    
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}


Author.init(
  {
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            len: [2]
        }

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
           
            len: [4]
        }
    }
  },
  {
    hooks: {
        
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
            
        },
       
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'author'
  }
);

module.exports = Author;