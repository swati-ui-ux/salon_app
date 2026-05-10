const User = require("../models/user")


const JobApplication = require("../models/jobApplication")
const Company = require("./company")
const Reminder = require("./reminder")

User.hasMany(JobApplication)
JobApplication.belongsTo(User)
User.hasMany(Company)
Company.belongsTo(User)
User.hasMany(Reminder)
Reminder.belongsTo(User)
module.exports = {User,JobApplication,Company,Reminder }