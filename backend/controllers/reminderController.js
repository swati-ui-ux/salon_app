// controllers/reminderController.js

const Reminder = require("../models/reminder")

// CREATE REMINDER
const createReminder = async (req, res) => {

    try {

        const {
            title,
            message,
            reminderDate
        } = req.body

        if (!title || !reminderDate) {

            return res.status(400).json({
                message: "Title and reminder date required"
            })

        }

        const reminder = await Reminder.create({

            title,
            message,
            reminderDate,

            UserId: req.user.id

        })

        res.status(201).json({

            message: "Reminder created successfully",

            reminder

        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// GET ALL REMINDERS
const getReminders = async (req, res) => {

    try {

        const reminders = await Reminder.findAll({

            where: {
                UserId: req.user.id
            },

            order: [
                ["createdAt", "DESC"]
            ]

        })

        res.status(200).json({
            reminders
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// GET SINGLE REMINDER
const getSingleReminder = async (req, res) => {

    try {

        const reminder = await Reminder.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!reminder) {

            return res.status(404).json({
                message: "Reminder not found"
            })

        }

        res.status(200).json({
            reminder
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// UPDATE REMINDER
const updateReminder = async (req, res) => {

    try {

        const reminder = await Reminder.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!reminder) {

            return res.status(404).json({
                message: "Reminder not found"
            })

        }

        const {
            title,
            message,
            reminderDate,
            status
        } = req.body

        await reminder.update({

            title,
            message,
            reminderDate,
            status

        })

        res.status(200).json({

            message: "Reminder updated successfully",

            reminder

        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// DELETE REMINDER
const deleteReminder = async (req, res) => {

    try {

        const reminder = await Reminder.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!reminder) {

            return res.status(404).json({
                message: "Reminder not found"
            })

        }

        await reminder.destroy()

        res.status(200).json({
            message: "Reminder deleted successfully"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

module.exports = {

    createReminder,
    getReminders,
    getSingleReminder,
    updateReminder,
    deleteReminder

}