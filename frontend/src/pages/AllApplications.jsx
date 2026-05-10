import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AllApplications = () => {

  const [applications, setApplications] = useState([])
 const navigate = useNavigate()
  // Get Applications
  const getApplications = async () => {

    try {

      const response = await api.get(
        "/applications/all"
      )

      setApplications(
        response.data.applications
      )
console.log(response)
    } catch (error) {

      console.log(error)

      toast.error("Failed to load applications")

    }

    }
    console.log('all render')

  useEffect(() => {

    getApplications()

  }, [])

    const deleteApplication = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure?"
  )

  if (!confirmDelete) return

  try {

    const response = await api.delete(
      `/applications/${id}`
    )

    toast.success(response.data.message)

    getApplications()

  } catch (error) {

    console.log(error)

    toast.error("Delete failed")

  }

}
    
  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        My Applications
      </h1>

      {
        applications.length === 0 ? (

          <p className="text-center text-gray-500">
            No applications found
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {
              applications.map((app) => (

                <div
                  key={app.id}
                  className="bg-white shadow-lg rounded-2xl p-6"
                >

                  <h2 className="text-2xl font-bold">
                    {app.companyName}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">
                      Job Title:
                    </span>

                    {" "}
                    {app.jobTitle}
                  </p>

                  <p className="text-gray-600">
                    <span className="font-semibold">
                      Location:
                    </span>

                    {" "}
                    {app.jobLocation || "N/A"}
                  </p>

                  <p className="text-gray-600">
                    <span className="font-semibold">
                      Salary:
                    </span>

                    {" "}
                    {app.salary || "N/A"}
                  </p>

                  <p className="text-gray-600">
                    <span className="font-semibold">
                      Status:
                    </span>

                    {" "}
                    {app.status}
                  </p>

                  <p className="text-gray-600">
                    <span className="font-semibold">
                      Applied On:
                    </span>

                    {" "}
                    {app.applicationDate}
                  </p>

                      <p className="text-gray-600 mt-3">
                        
                    <span className="font-semibold">
                      Notes:
                    </span>

                    {" "}
                    {app.notes || "No Notes"}
                  </p>
  <div className="flex gap-3 mt-5">

  <button
    onClick={() => navigate(`/edit-application/${app.id}`)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteApplication(app.id)}
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

  )

}

export default AllApplications