// models/reminder.js

const { DataTypes } = require("sequelize")

const sequelize = require("../config/db")

const Reminder = sequelize.define("Reminder", {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    message: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },

    reminderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            "Pending",
            "Completed"
        ),
        defaultValue: "Pending"
    },

    emailSent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    timestamps: true
})

module.exports = Reminder