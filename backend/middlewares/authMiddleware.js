const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization?.split(" ")[1]

    console.log(req.headers)

    console.log("Token is:", token)

    if (!token) {
      return res.status(401).json({
        message: "Token is missing"
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    )

    req.user = decoded

    next()

  } catch (error) {

    console.log(error.message)

    return res.status(401).json({
      message: "Invalid token"
    })

  }

}

module.exports = authMiddleware