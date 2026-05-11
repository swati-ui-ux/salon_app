// models/jobApplication.js

const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const JobApplication = sequelize.define("JobApplication", {

    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },

    jobLocation: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    salary: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    jobLink: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    status: {
        type: DataTypes.ENUM(
            "Applied",
            "Interview Scheduled",
            "Interviewed",
            "Rejected",
            "Offered",
            "Hired"
        ),
        defaultValue: "Applied"
    },

    applicationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    notes: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },

    resume: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    coverLetter: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    followUpDate: {
        type: DataTypes.DATEONLY
    },
    resume: {
   type: DataTypes.STRING,
   defaultValue: ""
}

}, {
    timestamps: true
})

module.exports = JobApplication