import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddReminder = () => {

  const navigate = useNavigate()

  const [reminders, setReminders] = useState([])

  const [formData, setFormData] = useState({

    title: "",
    message: "",
    reminderDate: ""

  })

  // Handle Change
const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  // Create Reminder
const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(

        "/reminders/create",

        formData

      )

      toast.success(response.data.message)

      setFormData({

        title: "",
        message: "",
        reminderDate: ""

      })

      getReminders()

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Failed to create reminder"
      )

    }

  }

  // Get Reminders
  const getReminders = async () => {

    try {

      const response = await api.get(
        "/reminders/all"
      )

      setReminders(
        response.data.reminders
      )

    } catch (error) {

      console.log(error)

      toast.error("Failed to load reminders")

    }

  }

  useEffect(() => {

    getReminders()

  }, [])

  // Delete Reminder
  const deleteReminder = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure?"
    )

    if (!confirmDelete) return

    try {

      const response = await api.delete(
        `/reminders/${id}`
      )

      toast.success(response.data.message)

      getReminders()

    } catch (error) {

      console.log(error)

      toast.error("Delete failed")

    }

  }

  return (

<div className="min-h-screen bg-gray-950 text-white p-6">
      {/* FORM */}

      <div className="bg-gray-900 border border-gray-800 shadow-xl rounded-2xl p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-8 text-white">
    Add Reminder
</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Reminder Title"
            value={formData.title}
            onChange={handleChange}
           className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
          />

          <textarea
            name="message"
            placeholder="Reminder Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500 h-28"
          />

          <div>

            <label className="block mb-1 font-medium">
              Reminder Date
            </label>

            <input
              type="datetime-local"
              name="reminderDate"
              value={formData.reminderDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-gray-950 hover:bg-gray-800 cursor-pointer text-white p-3 rounded-xl"
          >
            Add Reminder
          </button>

        </form>

      </div>

      {/* GET REMINDERS */}

      <div className="mt-12">

        <h1 className="text-3xl font-bold text-center mb-8">
          My Reminders
        </h1>

        {
          reminders.length === 0 ? (

            <p className="text-center text-gray-500">
              No reminders found
            </p>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {
                reminders.map((reminder) => (

                  <div
                    key={reminder.id}
                    className="bg-gray-800 border border-blue-700 shadow-lg rounded-2xl p-6"
                  >

                    <h2 className="text-2xl font-bold">
                      {reminder.title}
                    </h2>

                    <p className="text-gray-500 mt-3">
                      {reminder.message || "No Message"}
                    </p>

                    <p className="text-gray-500 mt-3">
                      <span className="font-semibold">
                        Reminder Date:
                      </span>

                      {" "}
                      {new Date(
                        reminder.reminderDate
                      ).toLocaleString()}
                    </p>

                    <p className="text-gray-500 mt-2">
                      <span className="font-semibold">
                        Status:
                      </span>

                      {" "}
                      {reminder.status}
                    </p>

                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() => navigate(`/edit-reminder/${reminder.id}`)}
                        className="bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-300  hover:text-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="bg-red-500/10 backdrop-blur-md border border-red-400/30 text-red-300  hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 active:scale-95 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
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

export default AddReminder