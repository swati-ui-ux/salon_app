const express = require("express")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT||4000

const sequelize = require("./config/db")

const cors = require("cors")
app.use(cors());
app.use(express.json())


const userRouter = require("./routers/userRouter")
require("./models/user")
require("./models")
// require("./models/product")

const jobApplicationRouter = require('./routers/jobApplicationRouter') 
const companyRoutes = require("./routers/companyRoutes")
const reminderRoutes = require('./routers/reminderRoutes')
const dashboardRoutes = require("./routers/dashboardRoutes")


app.use("/user", userRouter)
app.use("/applications", jobApplicationRouter)
app.use("/companies", companyRoutes)
app.use("/reminders", reminderRoutes)
app.use("/dashboard", dashboardRoutes)
app.use('/uploads',express.static("uploads"))
sequelize.sync().then(() => {
console.log("db is ok")
}).catch((err)=>{
console.log("Error in db",err)
})



app.listen(PORT, () => {
console.log("server is running on 5000")
})