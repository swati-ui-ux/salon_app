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

app.use("/user",userRouter)

sequelize.sync().then(() => {
console.log("db is ok")
}).catch((err)=>{
console.log("Error in db",err)
})



app.listen(PORT, () => {
console.log("server is running on 5000")
})