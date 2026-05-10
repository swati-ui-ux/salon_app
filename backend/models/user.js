// models/user.js

const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define("User", {

    name: {
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
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    careerGoal: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },

    profileImage: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    linkedinUrl: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    githubUrl: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    portfolioUrl: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    skills: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    experienceLevel: {
        type: DataTypes.ENUM(
            "Fresher",
            "Junior",
            "Mid-Level",
            "Senior"
        ),
        defaultValue: "Fresher"
    },

    city: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    country: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    timestamps: true
})

module.exports = User