import React, { useState } from 'react'
import "./AddJob.css"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/AppContext";
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from "react-toastify"

const AddJob = () => {
  const { recruiterToken, backendURL } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recruiterToken) {
      navigate("/recruiter-login");
    }
  }, [recruiterToken,navigate]);

  const [ data, setData ] = useState({
    title:"",
    location:"",
    category:"",
    level:"",
    salary:"",
    description:"",
    date:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data)=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${backendURL}/api/companydata/jobs`,data,{
        headers:{
          "Authorization":`Bearer ${recruiterToken}`
        }
      })
      if ( response.data.success ) {
        toast.success("Job is publsihed successfully")
        setData({
          title:"",
          location:"",
          category:"",
          level:"",
          salary:"",
          description:"",
          date:""
        });
      } else {
        toast.error("Failed to publish a job")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to publish a job");
    }
  }

  return( 
    <div>
       <div className='userProf-container-section'>
        <img onClick={()=>navigate("/recruiter-dashboard")} className='userProf-container-section-image' src={assets.back} alt="back" />
      </div>
    <div className='add-job-container-section'>
      <div className='add-job-title-main'>
        <h1 className='add-job-title-main-h1'>Post Job</h1>
      </div>
      <form onSubmit={onSubmitHandler} className='add-job-form'>
        <div className='add-job-title'>
          <p>Title</p>
          <input onChange={onChangeHandler} className='add-job-title-input' type="text" name="title" value={data.title} placeholder='Full Stack Developer' required/>
        </div>
        <div className='add-job-location'>
          <p>Location</p>
          <input onChange={onChangeHandler} className='add-location-input' type="text" name="location" value={data.location} placeholder='New York' required/>
        </div>
        <div className='add-job-category'>
          <p>Category</p>
          <input onChange={onChangeHandler} className='add-job-category-input' type="text" name="category" value={data.category}  placeholder='Programming' required/>
        </div>
        <div className='add-job-level'>
          <p>Level</p>
          <input onChange={onChangeHandler} className='add-job-level-input' type="text" name="level" value={data.level} placeholder='Junior' required/>
        </div>
        <div className='add-job-salary'>
          <p>Salary</p>
          <input onChange={onChangeHandler} className='add-job-salary-input' type="number" name="salary" value={data.salary} placeholder='82000$' required/>
        </div>
        <div className='add-job-description'>
          <p>Description</p>
          <textarea onChange={onChangeHandler} className='add-job-description-input' name="description" value={data.description} cols="30" rows="10" placeholder='...Describe the job key responsibilities and company duties etc....'></textarea>
        </div>
        <div className='add-job-date'>
          <p>Date</p>
          <input onChange={onChangeHandler} className='add-job-date-input' type="date" name="date" value={data.date} placeholder='20.12.2026' required/>
        </div>
        <div className='add-job-button-btn'>
          <button className='add-job-button-btn-ty' type='submit'>Post</button>
        </div>
      </form>
    </div>
    </div>
  )
};

export default AddJob;

