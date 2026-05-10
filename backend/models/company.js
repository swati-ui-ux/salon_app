// models/company.js

const { DataTypes } = require("sequelize")

const sequelize = require("../config/db")

const Company = sequelize.define("Company", {

    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    industry: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    companySize: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    website: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    hrName: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    hrEmail: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    location: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    notes: {
        type: DataTypes.TEXT,
        defaultValue: ""
    }

}, {
    timestamps: true
})

module.exports = Company