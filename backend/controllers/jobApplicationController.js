// controllers/jobApplicationController.js

const { Op } = require("sequelize")
const JobApplication = require("../models/jobApplication")

const createJobApplication = async (req, res) => {

    try {
        const resume = req.file ? req.file.filename : ""
        console.log(req.file)
        const {
            companyName,
            jobTitle,
            jobLocation,
            salary,
            jobLink,
            status,
            applicationDate,
            notes,
            followUpDate
        } = req.body

        // Validation
        if (
            !companyName ||
            !jobTitle ||
            !applicationDate
        ) {

            return res.status(400).json({
                message: "companyName, jobTitle and applicationDate are required"
            })

        }

        // Create Application
        const application = await JobApplication.create({

            companyName,
            jobTitle,
            jobLocation,
            salary,
            jobLink,
            status,
            applicationDate,
            notes,
            followUpDate,
           resume,
            // Logged in user id
            UserId: req.user.id

        })

        // Response
        res.status(201).json({
            message: "Job Application Created Successfully",
            application
        })

    } catch (error) {

        console.log(error.message)

        res.status(500).json({
            message: "Server Error"
        })

    }

}


const getAllApplications = async (req, res) => {

    try {
        const { search ,status, startDate,
   endDate} = req.query;
        let whereCondition = {
                userId: req.user.id
        }
        if (search) {
            whereCondition[Op.or] = [
                {
                    companyName: {
                    [Op.like] :`%${search}%`
                    }
                },
                {
                    jobTitle: {
                    [Op.like]:`%${search}%`
                    }
                }
            ]
        }
        if (status) {
            whereCondition.status = status
        }
    if (startDate && endDate) {
   whereCondition.applicationDate = {
      [Op.between]: [

         new Date(startDate),

         new Date(endDate)

      ]

   }

}
        const applications = await JobApplication.findAll({

            where: whereCondition,

            order: [
                ["createdAt", "DESC"]
            ]

        })

        console.log(applications)

        res.status(200).json({
            applications
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}




const deleteApplication = async (req, res) => {

    try {

        const application = await JobApplication.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!application) {

            return res.status(404).json({
                message: "Application not found"
            })

        }

        await application.destroy()

        res.status(200).json({
            message: "Application deleted successfully"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}


const updateApplication = async (req, res) => {

    try {

        const application = await JobApplication.findOne({

            where: {
                id: req.params.id,
                UserId: req.user.id
            }

        })

        if (!application) {

            return res.status(404).json({
                message: "Application not found"
            })

        }

        await application.update(req.body)

        res.status(200).json({

            message: "Application updated successfully",

            application

        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}




const getSingleApplication = async (req, res) => {

    try {

        const application = await JobApplication.findOne({

            where: {

                id: req.params.id,

                UserId: req.user.id

            }

        })

        if (!application) {

            return res.status(404).json({
                message: "Application not found"
            })

        }

        res.status(200).json({
            application
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}



module.exports = {createJobApplication,getAllApplications,deleteApplication,updateApplication,getSingleApplication
}