import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const EditReminder = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    title: "",
    message: "",
    reminderDate: "",
    status: "Pending"

  })

  // Get Single Reminder
  const getSingleReminder = async () => {

    try {

      const response = await api.get(
        `/reminders/${id}`
      )

      const reminder = response.data.reminder

      setFormData({

        title: reminder.title || "",

        message: reminder.message || "",

        reminderDate: reminder.reminderDate
          ? reminder.reminderDate.slice(0, 16)
          : "",

        status: reminder.status || "Pending"

      })

    } catch (error) {

      console.log(error)

      toast.error("Failed to load reminder")

    }

  }

  useEffect(() => {

    getSingleReminder()

  }, [])

  // Handle Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  // Update Reminder
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await api.put(

        `/reminders/${id}`,

        formData

      )

      toast.success(response.data.message)

      navigate("/add-reminder")

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Update failed"
      )

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-8">
          Edit Reminder
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Reminder Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="message"
            placeholder="Reminder Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-28"
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
              className="w-full border p-3 rounded-xl"
            />

          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
          >
            Update Reminder
          </button>

        </form>

      </div>

    </div>

  )

}

export default EditReminder