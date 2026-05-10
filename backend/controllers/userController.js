const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt  = require('jsonwebtoken') 

const registerUser = async (req, res) => {
      try {

    const {
      name,
      email,
      password,
      phone,
      careerGoal,
      profileImage,
      city,
      country
    } = req.body

    // Validation
    if (!name || !email || !password || !phone) {

      return res.status(400).json({
        message: "Name, email, password and phone are required"
      })

    }

    // Check existing user
    const existingUser = await User.findOne({
      where: { email }
    })

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      })

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      phone,
      careerGoal,
      profileImage,
      city,
      country

    })

    // Response
    res.status(201).json({
      message: "User registered successfully",
      user
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }
}


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        // Validation
        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            })

        }

        // Check user
        const user = await User.findOne({
            where: { email }
        })

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email"
            })

        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            })

        }

        // JWT Token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "7d"
            }
        )

        // Response
        res.status(200).json({
            message: "Login Successful",
            token,
            user
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}


const getProfile = async (req, res) => {

    try {

        const user = await User.findByPk(
            req.user.id,
            {
                attributes: {
                    exclude: ["password"]
                }
            }
        )

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            })

        }

        res.status(200).json({
            user
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            phone,
            careerGoal,
            profileImage,
            city,
            country
        } = req.body

        const user = await User.findByPk(req.user.id)

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            })

        }

        // Update fields
        user.name = name || user.name
        user.phone = phone || user.phone
        user.careerGoal = careerGoal || user.careerGoal
        user.profileImage = profileImage || user.profileImage
        user.city = city || user.city
        user.country = country || user.country

        await user.save()

        res.status(200).json({
            message: "Profile updated successfully",
            user
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}



const deleteProfile = async (req, res) => {

    try {

        const user = await User.findByPk(req.user.id)

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            })

        }

        await user.destroy()

        res.status(200).json({
            message: "Account deleted successfully"
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}



module.exports = {registerUser,loginUser,getProfile,updateProfile,deleteProfile}