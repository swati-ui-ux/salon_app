// pages/AddCompany.jsx

import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddCompany = () => {

  const [companies, setCompanies] = useState([])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({

    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    hrName: "",
    hrEmail: "",
    location: "",
    notes: ""

  })

  // Handle Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  // Create Company
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(
        "/companies/create",
        formData
      )

      toast.success(response.data.message)

      // Reset form
      setFormData({

        companyName: "",
        industry: "",
        companySize: "",
        website: "",
        hrName: "",
        hrEmail: "",
        location: "",
        notes: ""

      })

      // Refresh companies
      getCompanies()

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Failed to create company"
      )

    }

  }

  // Get Companies
  const getCompanies = async () => {

    try {

      const response = await api.get(
        "/companies/all"
      )

      setCompanies(
        response.data.companies
      )

    } catch (error) {

      console.log(error)

      toast.error("Failed to load companies")

    }

  }

  useEffect(() => {

    getCompanies()

  }, [])
    
const deleteCompany = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure?"
  )

  if (!confirmDelete) return

  try {

    const response = await api.delete(
      `/companies/${id}`
    )

    toast.success(response.data.message)

    getCompanies()

  } catch (error) {

    console.log(error)

    toast.error("Delete failed")

  }

}

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* FORM */}

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-8">
          Add Company
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="companySize"
            placeholder="Company Size"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="hrName"
            placeholder="HR Name"
            value={formData.hrName}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="email"
            name="hrEmail"
            placeholder="HR Email"
            value={formData.hrEmail}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-28"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
          >
            Add Company
          </button>

        </form>

      </div>

      {/* GET COMPANIES */}

      <div className="mt-12">

        <h1 className="text-3xl font-bold text-center mb-8">
          My Companies
        </h1>

        {
          companies.length === 0 ? (

            <p className="text-center text-gray-500">
              No companies found
            </p>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {
                companies.map((company) => (

                  <div
                    key={company.id}
                    className="bg-white shadow-lg rounded-2xl p-6"
                  >

                    <h2 className="text-2xl font-bold">
                      {company.companyName}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold">
                        Industry:
                      </span>

                      {" "}
                      {company.industry || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Company Size:
                      </span>

                      {" "}
                      {company.companySize || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Website:
                      </span>

                      {" "}
                      {company.website || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        HR Name:
                      </span>

                      {" "}
                      {company.hrName || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        HR Email:
                      </span>

                      {" "}
                      {company.hrEmail || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Location:
                      </span>

                      {" "}
                      {company.location || "N/A"}
                    </p>

                    <p className="text-gray-600 mt-3">
                      <span className="font-semibold">
                        Notes:
                      </span>

                      {" "}
                      {company.notes || "No Notes"}
                        </p>
                        <div className="flex gap-3 mt-5">

  <button
    onClick={() => navigate(`/edit-company/${company.id}`)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteCompany(company.id)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>

                    </div>
                    

                ))
              }

            </div>

          )
        }

      </div>

    </div>

  )

}

export default AddCompany