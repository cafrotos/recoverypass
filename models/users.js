'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    usernames: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};