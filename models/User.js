const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')


// class User extends Model { }
class User extends Model {
  // set up an "Instance Method" to run on instance data (per user) to check password
  //Using keyword THIS,  access THIS user's properties, including PW which was stored as a hashed string.
  //takes  plaintext PW retrieved from the client request at req.body.email  & compares with THIS pw
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}


// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
  },
  //2nd param
  {
    hooks: {
      // set up beforeCreate to hash PW:
      // pass new PW as prop on userData{} to b4Cre(),  
      // goes to bcrypt to hash
      //then hashPW passed to the Promise{} sa newUserData (it now contains hasedPW)
      //return exits f() and returns hPW in newUserData f()
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
