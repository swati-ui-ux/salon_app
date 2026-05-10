// routes/reminderRoutes.js

const express = require("express")

const router = express.Router()

const authMiddleware = require("../middlewares/authMiddleware")

const {

    createReminder,
    getReminders,
    getSingleReminder,
    updateReminder,
    deleteReminder

} = require("../controllers/reminderController")

router.post(
    "/create",
    authMiddleware,
    createReminder
)

router.get(
    "/all",
    authMiddleware,
    getReminders
)

router.get(
    "/:id",
    authMiddleware,
    getSingleReminder
)

router.put(
    "/:id",
    authMiddleware,
    updateReminder
)

router.delete(
    "/:id",
    authMiddleware,
    deleteReminder
)

module.exports = router