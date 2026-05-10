// controllers/companyController.js

const Company = require("../models/company")

// CREATE
const createCompany = async (req, res) => {

    try {

        const company = await Company.create({

            ...req.body,

            UserId: req.user.id

        })

        res.status(201).json({
            message: "Company created successfully",
            company
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// GET ALL
const getCompanies = async (req, res) => {

    try {

        const companies = await Company.findAll({

            where: {
                UserId: req.user.id
            },

            order: [
                ["createdAt", "DESC"]
            ]

        })

        res.status(200).json({
            companies
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// controllers/companyController.js

const deleteCompany = async (req, res) => {

    try {

        const company = await Company.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!company) {

            return res.status(404).json({
                message: "Company not found"
            })

        }

        await company.destroy()

        res.status(200).json({
            message: "Company deleted successfully"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}


const updateCompany = async (req, res) => {

    try {

        const company = await Company.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!company) {

            return res.status(404).json({
                message: "Company not found"
            })

        }

        const {
            companyName,
            industry,
            companySize,
            website,
            hrName,
            hrEmail,
            location,
            notes
        } = req.body

        await company.update({

            companyName,
            industry,
            companySize,
            website,
            hrName,
            hrEmail,
            location,
            notes

        })

        res.status(200).json({

            message: "Company updated successfully",

            company

        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// controllers/companyController.js

const getSingleCompany = async (req, res) => {

    try {

        const company = await Company.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!company) {

            return res.status(404).json({
                message: "Company not found"
            })

        }

        res.status(200).json({
            company
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

module.exports = {
    createCompany,
    getCompanies,
    updateCompany,
    deleteCompany,
    getSingleCompany
}