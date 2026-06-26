import React, { useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import AllApplications from './AllApplications'
import { Link, useNavigate } from 'react-router-dom'

const AddJobApplication = () => {
const navigate = useNavigate()
  const [formData, setFormData] = useState({

    companyName: "",
    jobTitle: "",
    jobLocation: "",
    salary: "",
    jobLink: "",
    status: "Applied",
    applicationDate: "",
    notes: "",
    followUpDate: "",
    resume: null,

  })

const handleChange = (e) => {

  const { name, value, files } = e.target

  if (name === "resume") {

    setFormData({

      ...formData,

      resume: files[0]

    })

  } else {

    setFormData({

      ...formData,

      [name]: value

    })

  }

}

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

     const data = new FormData()

Object.keys(formData).forEach((key) => {

  data.append(key, formData[key])

})

const response = await api.post(

  "/applications/create",

  data,
 {

    headers: {

      "Content-Type": "multipart/form-data"

    }

  }

)
toast.success(response.data.message)
      console.log(response)
      // Reset form
      setFormData({

        companyName: "",
        jobTitle: "",
        jobLocation: "",
        salary: "",
        jobLink: "",
        status: "Applied",
        applicationDate: "",
        notes: "",
        followUpDate: "",
        resume: null,
      })
      navigate("/all-applications")

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Failed to add application"
      )

    }

  }

  return (
<>
    <div className="min-h-screen bg-gray-950 flex justify-center items-center p-6">

     <div className="relative bg-gray-900 border border-gray-800 shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Add Job Application
        </h1>
          <Link
            to="/all-applications"
            className=" absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
          >
            X
          </Link>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
          />

          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
          />

          <input
            type="text"
            name="jobLocation"
            placeholder="Job Location"
            value={formData.jobLocation}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
          />

          <input
            type="text"
            name="jobLink"
            placeholder="Job Link"
            value={formData.jobLink}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
          />
            <div>

  <label className="block mb-2 font-medium">

    Upload Resume

  </label>

  <input
    type="file"
                name="resume"
             accept=".pdf"
    onChange={handleChange}
    className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
  />

</div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
          >

            <option value="Applied">
              Applied
            </option>

            <option value="Interview Scheduled">
              Interview Scheduled
            </option>

            <option value="Interviewed">
              Interviewed
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="Offered">
              Offered
            </option>

            <option value="Hired">
              Hired
            </option>

          </select>

          <div>

            <label className="block mb-1 font-medium">
              Application Date
            </label>

            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
  "
            />

          </div>

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
          />

          <div>

            <label className="block mb-1 font-medium">
              Follow Up Date
            </label>

            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700
text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none
focus:border-blue-500
"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-gray-950 hover:bg-gray-800 cursor-pointer text-white p-3 rounded-xl"
          >
            Add Application
            </button>
            

        </form>

      </div>

      </div>
</>

  )

}

export default AddJobApplication