// routes/companyRoutes.js

const express = require("express")

const router = express.Router()

const authMiddleware = require("../middlewares/authMiddleware")

const {createCompany,getCompanies, getSingleCompany, updateCompany, deleteCompany} = require("../controllers/companyController")

router.post(
    "/create",
    authMiddleware,
    createCompany
)

router.get(
    "/all",
    authMiddleware,
    getCompanies
)

// routes/companyRoutes.js

router.get(
    "/:id",
    authMiddleware,
    getSingleCompany
)

router.put(
    "/:id",
    authMiddleware,
    updateCompany
)

router.delete(
    "/:id",
    authMiddleware,
    deleteCompany
)
module.exports = router