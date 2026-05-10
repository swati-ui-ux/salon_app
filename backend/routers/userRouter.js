const express = require("express")
const {registerUser,loginUser, getProfile,updateProfile,deleteProfile} = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get(
    "/profile",
    authMiddleware,
    getProfile
)
// routes/userRoutes.js

router.put("/profile", authMiddleware, updateProfile)
router.delete(
    "/profile",
    authMiddleware,
    deleteProfile
)
// router.get("/profile", authMiddleware, getUser)
// router.put("/profile",authMiddleware,updateUser)
module.exports = router