const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
    cb(null,Date.now()+ "-" +file.originalname)
    }

})
const fileFilter = (req, file, cb) => {

  // Allowed file types

  const allowedTypes = [

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  ]

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true)

  } else {

    cb(
      new Error("Only PDF and DOC files are allowed"),
      false
    )

  }

}

const upload = multer({ storage,fileFilter })

module.exports = upload