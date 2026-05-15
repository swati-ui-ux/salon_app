
const { Sequelize } = require("sequelize")

require("dotenv").config()
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,        
    }
)
    ; (async (params) => {
    try {
        sequelize.authenticate();
        console.log("db ok h")
    } catch (error) {
        console.log(error)
    }
})()


module.exports = sequelize