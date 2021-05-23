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
      // define an id column
      id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            len: [2]
        }

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
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
        
        async beforeCreate(newAuthorData) {
            newAuthorData.password = await bcrypt.hash(newAuthorData.password, 10);
            return newAuthorData;
            
        },
       
        async beforeUpdate(updatedAuthorData) {
            updatedAuthorData.password = await bcrypt.hash(updatedAuthorData.password, 10);
            return updatedAuthorData;
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
