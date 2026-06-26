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

    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center p-6">

      <div className="w-full max-w-2xl bg-[#1e293b]/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 p-8" >

        <h1 className="text-3xl font-bold text-center text-white mb-8">
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
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <textarea
            name="message"
            placeholder="Reminder Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-28 bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <div>

            <label className="block mb-2 font-medium text-gray-300">
              Reminder Date
            </label>

            <input
              type="datetime-local"
              name="reminderDate"
              value={formData.reminderDate}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />

          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
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
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold p-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Update Reminder
          </button>

        </form>

      </div>

    </div>

  )

}

export default EditReminder