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
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";

    case "Interviewed":
      return "bg-green-500/20 text-green-300 border-green-500/30";

    case "Rejected":
      return "bg-red-500/20 text-red-300 border-red-500/30";

    case "Offered":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";

    case "Hired":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";

    default:
      return "bg-slate-700 text-gray-300 border-slate-600";
  }
};

  
  
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

<div className="min-h-screen bg-[#0f172a] p-6 text-white">

      {/* Heading */}
     <div className="mx-auto mt-16 mb-8 lg:w-[80%] rounded-2xl bg-[#1e293b] border border-slate-700 shadow-2xl p-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">

        My Applications

          </h1>
           <Link
              to="/add-applications"
              className="absolute right-10 top-18  items-center justify-center  px-6 py-3 rounded-xl bg-cyan-500/15 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-semibold hover:bg-cyan-500 hover:text-white hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              ➕ Add Job Application
            </Link>

      {/* Search */}

      <div className="my-8 ">

        <input
          type="text"
          placeholder="Search by company or job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0f172a] border border-slate-600 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />

        </div>
        
          
          {/* status  */}
          
          <div className="mb-6">

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
   className="w-full bg-[#0f172a] border border-slate-600 text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
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

    <label className="block mb-2 font-semibold text-gray-300">
      Start Date
    </label>

    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="w-full bg-[#0f172a] border border-slate-600 text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
    />

  </div>

  {/* End Date */}

  <div>

    <label className="block mb-2 font-semibold text-gray-300">
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <h2 className="text-2xl font-semibold text-white">

              No applications found 🚀

            </h2>

            <p className="text-gray-400 mt-2">

              Start adding your job applications.

            </p>

          </div>

        ) : (

         Object.entries(groupedApplications).map(

  ([date, apps]) => (

    <div key={date} className="mb-10">

      {/* Date Heading */}

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">

        {date}

      </h2>

      {/* Applications */}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {

          apps.map((app) => (

            <div
              key={app.id}
              className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6  shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300"
            >

              {/* Company */}

              <h2 className="text-2xl font-bold text-white">

                {app.companyName}

              </h2>

              {/* Job Title */}

              <p className="text-gray-300 mt-3">

                <span className="font-semibold">

                  Job Title:

                </span>

                {" "}

                {app.jobTitle}

              </p>

              {/* Location */}

              <p className="text-gray-300 mt-2">

                <span className="font-semibold">

                  Location:

                </span>

                {" "}

                {app.jobLocation || "N/A"}

              </p>

              {/* Salary */}

              <p className="text-gray-300 mt-2">

                <span className="font-semibold">

                  Salary:

                </span>

                {" "}

                {app.salary || "N/A"}

              </p>

              {/* Status */}

              <div className="mt-4">

                <span
                 className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide border ${getStatusColor(app.status)}`}
                >

                  {app.status}

                </span>

              </div>

              {/* Applied Date */}

              <p className="text-gray-300 mt-4">

                <span className="text-gray-300 mt-4 mb-4">

                  Applied On:

                </span>

                {" "}

                {
                  new Date(app.applicationDate)
                    .toLocaleDateString()
                }

              </p>

              {/* Notes */}

              <p className="text-gray-300 mt-4 mb-4">

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

                    className="text-cyan-400 hover:text-cyan-300 underline transition"

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
                 className="flex-1 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                >

                  Edit

                </button>

                <button
                  onClick={() =>
                    deleteApplication(app.id)
                  }
                 className="flex-1 bg-linear-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white py-2.5 rounded-xl font-semibold shadow-md shadow-red-400/20 hover:shadow-red-400/40 hover:scale-105 active:scale-95 transition-all duration-300"
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

    className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2 rounded-xl disabled:bg-slate-700 disabled:cursor-not-allowed transition-all duration-300"

  >
    Prev
  </button>

  <span className="font-semibold text-lg">

    Page {page} of {totalPages}

  </span>

  <button

    disabled={page === totalPages}

    onClick={() => setPage(page + 1)}

    className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"

  >
    Next
  </button>

</div>

    </div>

  )

}

export default AllApplications