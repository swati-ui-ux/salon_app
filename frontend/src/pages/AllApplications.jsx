import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const AllApplications = () => {

  const [applications, setApplications] = useState([])
    const [status, setStatus] = useState("")
    const [search, setSearch] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    
  const [page, setPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)

  const navigate = useNavigate()

  // Get Applications

  const getApplications = async () => {

    try {

      const response = await api.get(`/applications/all?page=${page}&limit=5&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`

)

      setApplications(
        response.data.applications
      )
      setTotalPages(
        response.data.totalPages      
      )
      
    } catch (error) {

      console.log(error)

      toast.error("Failed to load applications")

    }

  }

  useEffect(() => {
  setPage(1)
  },[search,status,startDate,endDate])
  useEffect(() => {

    getApplications()

  }, [search,status,startDate,endDate,page])

  // Delete Application

  const deleteApplication = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    )

    if (!confirmDelete) return

    try {

      const response = await api.delete(

        `/applications/${id}`

      )

      toast.success(response.data.message)
      // this is use for set previous page after deleting the appication 
      if (applications.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
      getApplications()
      }

    } catch (error) {

      console.log(error)

      toast.error("Delete failed")

    }

  }

  // Status Colors

  const getStatusColor = (status) => {

    switch (status) {

      case "Applied":
        return "bg-blue-100 text-blue-600"

      case "Interviewed":
        return "bg-green-100 text-green-600"

      case "Rejected":
        return "bg-red-100 text-red-600"

      case "Offered":
        return "bg-yellow-100 text-yellow-700"

      case "Hired":
        return "bg-purple-100 text-purple-700"

      default:
        return "bg-gray-100 text-gray-600"

    }

  }

  
  
const groupedApplications = applications.reduce(

  (groups, app) => {

    const today = new Date()

    const appDate = new Date(app.applicationDate)

    const formattedDate =
      appDate.toDateString() === today.toDateString()
        ? "Today"
        : appDate.toLocaleDateString()

    if (!groups[formattedDate]) {

      groups[formattedDate] = []

    }

    groups[formattedDate].push(app)

    return groups

  },

  {}

)
  
  return (

    <div className="min-h-screen  bg-gray-100 p-6">

      {/* Heading */}
      <div className='  mx-auto mt-16 mb-8 lg:w-[80%]  rounded-xl shadow-xl shadow-gray-500 p-4'>
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">

        My Applications

          </h1>
          <Link to='/add-applications' className='p-4 m-2 bg-blue-500 rounded-md text-white absolute right-0 top-15 ' >Add JobApplication</Link>

      {/* Search */}

      <div className="my-8 ">

        <input
          type="text"
          placeholder="Search by company or job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 p-4 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
        />

        </div>
        
          
          {/* status  */}
          
          <div className="mb-6">

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full border p-3 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
  >

    <option value="">
      All Status
    </option>

    <option value="Applied">
      Applied
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

</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

  {/* Start Date */}

  <div>

    <label className="block mb-2 font-semibold">
      Start Date
    </label>

    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="w-full border p-3 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
    />

  </div>

  {/* End Date */}

  <div>

    <label className="block mb-2 font-semibold">
      End Date
    </label>

    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="w-full border p-3 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
    />

  </div>

</div>

      </div>
    
      {/* No Data */}

      {
        applications.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <h2 className="text-2xl font-semibold text-gray-600">

              No applications found 🚀

            </h2>

            <p className="text-gray-500 mt-2">

              Start adding your job applications.

            </p>

          </div>

        ) : (

         Object.entries(groupedApplications).map(

  ([date, apps]) => (

    <div key={date} className="mb-10">

      {/* Date Heading */}

      <h2 className="text-2xl font-bold text-blue-600 mb-6">

        {date}

      </h2>

      {/* Applications */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {

          apps.map((app) => (

            <div
              key={app.id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
            >

              {/* Company */}

              <h2 className="text-2xl font-bold text-gray-800">

                {app.companyName}

              </h2>

              {/* Job Title */}

              <p className="text-gray-600 mt-3">

                <span className="font-semibold">

                  Job Title:

                </span>

                {" "}

                {app.jobTitle}

              </p>

              {/* Location */}

              <p className="text-gray-600 mt-2">

                <span className="font-semibold">

                  Location:

                </span>

                {" "}

                {app.jobLocation || "N/A"}

              </p>

              {/* Salary */}

              <p className="text-gray-600 mt-2">

                <span className="font-semibold">

                  Salary:

                </span>

                {" "}

                {app.salary || "N/A"}

              </p>

              {/* Status */}

              <div className="mt-4">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}
                >

                  {app.status}

                </span>

              </div>

              {/* Applied Date */}

              <p className="text-gray-600 mt-4">

                <span className="font-semibold">

                  Applied On:

                </span>

                {" "}

                {
                  new Date(app.applicationDate)
                    .toLocaleDateString()
                }

              </p>

              {/* Notes */}

              <p className="text-gray-600 mt-4 mb-4">

                <span className="font-semibold">

                  Notes:

                </span>

                {" "}

                {app.notes || "No Notes"}

              </p>

              {/* Resume */}

              {

                app.resume && (

                  <a

                    href={app.resume}

                    target="_blank"

                    rel="noreferrer"

                    className="text-blue-500 underline"

                  >

                    View Resume

                  </a>

                )

              }

              {/* Buttons */}

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    navigate(`/edit-application/${app.id}`)
                  }
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition duration-300"
                >

                  Edit

                </button>

                <button
                  onClick={() =>
                    deleteApplication(app.id)
                  }
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition duration-300"
                >

                  Delete

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  )

)

        )

      }
      <div className="flex justify-center items-center gap-4 mt-10">

  <button

    disabled={page === 1}

    onClick={() => setPage(page - 1)}

    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"

  >
    Prev
  </button>

  <span className="font-semibold text-lg">

    Page {page} of {totalPages}

  </span>

  <button

    disabled={page === totalPages}

    onClick={() => setPage(page + 1)}

    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"

  >
    Next
  </button>

</div>

    </div>

  )

}

export default AllApplications