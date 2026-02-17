import React, { useContext, useState } from 'react'
import "./UpdateJob.css"
import axios from 'axios'
import { StoreContext } from '../../context/AppContext'
import { toast } from "react-toastify"
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'

const UpdateJob = () => {

  const { backendURL, recruiterToken, navigate } = useContext(StoreContext)
  const { id } = useParams()

  const [data, setData] = useState({
    title: "",
    location: "",
    category: "",
    level: "",
    salary: "",
    description: "",
    date: ""
  })

  // ✅ FIXED
  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  // ✅ FIXED
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.put(
        `${backendURL}/api/companydata/jobs/${id}`,
        data, // ✅ SEND DATA
        {
          headers: {
            Authorization: `Bearer ${recruiterToken}`
          }
        }
      )

      if (response.data.success) {
        toast.success("Job updated successfully")
        navigate("/manage-jobs")
      } else {
        toast.error("Failed to update job")
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Failed to update job")
    }
  }

  return (
    <div>
      <div className='userProf-container-section'>
        <img
          onClick={() => navigate(`/apply-job/${id}`)}
          className='userProf-container-section-image'
          src={assets.back}
          alt="back"
        />
      </div>
      <form onSubmit={onSubmitHandler} className='update-job-form'>
        <h1>Update Job</h1>

        <div>
          <h3>Title</h3>
          <input
            onChange={onChangeHandler}
            className='update-job-form-input'
            type="text"
            name="title"
            value={data.title}

          />
        </div>

        <div>
          <h3>Location</h3>
          <input
            onChange={onChangeHandler}
            className='update-job-form-input'
            type="text"
            name="location"
            value={data.location}

          />
        </div>

        <div>
          <h3>Category</h3>
          <input
            onChange={onChangeHandler}
            className='update-job-form-input'
            type="text"
            name="category"
            value={data.category}

          />
        </div>

        <div>
          <h3>Level</h3>
          <input
            onChange={onChangeHandler}
            className='update-job-form-input'
            type="text"
            name="level"
            value={data.level}

          />
        </div>

        <div>
          <h3>Salary</h3>
          <input
            onChange={onChangeHandler}
            className='update-job-form-input'
            type="number"
            name="salary"
            value={data.salary}

          />
        </div>

        <div>
          <h3>Description</h3>
          <textarea
            onChange={onChangeHandler}
            className='update-job-form-input-textarea'
            name="description"
            value={data.description}

          />
        </div>

        <div>
          <h3>Date</h3>
          <input
            onChange={onChangeHandler}
            className='update-job-form-input'
            type="date"
            name="date"
            value={data.date}

          />
        </div>

        <div className='update-job-form-button-btn-div'>
          <button className='update-job-form-button-btn' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateJob
