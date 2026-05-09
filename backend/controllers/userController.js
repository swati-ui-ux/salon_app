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
      street,
      apartment,
      zip,
      city,
      country
    } = req.body

    if (!name || !email || !password || !phone) {

      return res.status(400).json({
        message: "name,email,password,phone required"
      })

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      phone,
      isAdmin: false,
      street,
      apartment,
      zip,
      city,
      country

    })

    res.status(201).json({
      message: "successfully register",
      user
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "server error"
    })

  }

}


const loginUser =async(req,res)=>{
try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(404).json({message:"password is not valid"})
    }
    const token = jwt.sign({
        id: user.id,
        email: user.emai,
        isAdmin:user.isAdmin,
    }, process.env.SECRET_KEY, { expiresIn: "7d" })
      return res.status(200).json({message:"login success",token})
} catch (error) {
  console.log(error.message)
     return res.status(500).json({message:"server error"})
}
}

const getUser = async(req,res)=>{
try {
    const user = await User.findByPk(req.user.id, {
        attributes: {
        exclude:['password']
        }
    })
  res.status(200).json(user)
  
} catch (error) {
  console.log(error)
  res.status(500).json({
      error: error.message
  })
  }
  
}

const updateUser = async (req,res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
         return res.status(404).json({message:"User not found"})
      }
      await user.update(req.body)
      res.status(200).json({
        message: "Profile Updated",
        user
      })
    } catch (error) {
      console.log(error.message)
        res.status(500).json({
      error: error.message
    })
    }
}

module.exports = {registerUser,loginUser,getUser,updateUser}