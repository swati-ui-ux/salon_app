const { User } = require("../models")
const verifyGoogleToken = require("../utils/googleAuth")
const jwt = require("jsonwebtoken")

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    // Verify Google Token
    const payload = await verifyGoogleToken(token);
    // Check if user already exists
    let user = await User.findOne({
      where: {
        email: payload.email,
      },
    });
    // Create new user if not found
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        profileImage: payload.picture,
        googleId: payload.sub,
        provider: "google",
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = googleLogin