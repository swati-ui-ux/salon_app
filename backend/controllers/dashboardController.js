const { JobApplication, Company, Reminder } = require("../models")



const getDashboardStats = async (req, res) => {
    try {
        const totalApplications = await JobApplication.count({ where: { UserId: req.user.id } });
        const interviewed = await JobApplication.count({
            where: {
                UserId: req.user.id,
                status:"Interviewed"
            }
        })
        const rejected = await JobApplication.count({
            where: {
                UserId: req.user.id,
                status:"Rejected",
            }
        })
        const offered = await JobApplication.count({
            where: {
                UserId: req.user.id,
                status:"Offered"
            }
        })
        const companies = await Company.count({
            where: {
                UserId: req.user.id,
            }
        })
        const pendingReminders = await Reminder.count({
            where: {
                UserId: req.user.id,
                status:"Pending",
            }
        })
        const applied =
await JobApplication.count({

   where: {
      UserId: req.user.id,
      status: "Applied"
   }

})
        res.status(200).json({
            rejected,
            offered,
            companies,
            interviewed,
            pendingReminders,
            totalApplications,
            applied
        })
        
    } catch (error) {
          console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }
}
module.exports = {getDashboardStats}