// models/user.js

const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  skills: {
    type: DataTypes.TEXT,
    defaultValue: "[]",
  },

  experienceLevel: {
    type: DataTypes.ENUM(
      "Fresher",
      "Junior",
      "Mid-Level",
      "Senior"
    ),
    defaultValue: "Fresher",
  },
});

module.exports = User