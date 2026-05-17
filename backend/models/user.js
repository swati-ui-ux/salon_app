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

  careerGoal: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  profileImage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },

});

module.exports = User