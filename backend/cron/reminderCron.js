const cron = require("node-cron")
const db = require("../config/db")
const sendEmail = require("../utils/sendEmail")

const Reminder = require("../models/reminder")
const User = require("../models/user")
console.log("Cron started")
cron.schedule("* * * * *", async () => {
    console.log("checking cron")
    const now = new Date();
    const reminders = await Reminder.findAll({
        where: {
            reminderDate: { [db.Sequelize.Op.lte]: now },
            emailSent:false,
        }
    })
    for(let reminder of reminders){
        const user = await User.findByPk(reminder.UserId);
        if (user) {
            await sendEmail(
                user.email,
                reminder.title,
                reminder.message,
            )
        }
        await reminder.update({
            emailSent: true,
            status:"Completed"
        })
    }

})