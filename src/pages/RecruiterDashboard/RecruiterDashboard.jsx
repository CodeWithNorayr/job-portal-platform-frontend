import React, { useContext, useEffect } from 'react'
import "./RecruiterDashboard.css"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from "react-toastify"

const RecruiterDashboard = () => {
  const navigate = useNavigate()
  const { recruiterToken, setRecruiterToken, backendURL } = useContext(StoreContext)

  useEffect(()=>{
    if(!recruiterToken){
      navigate("/recruiter-login")
    }
  },[recruiterToken,navigate])

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`${backendURL}/api/companydata/company`)
      if (response.data.success) {
        setRecruiterToken("")
        localStorage.removeItem("recruiterToken")
        toast.success("Account is successfully deleted")
        navigate("/recruiter-login")
      } else {
        toast.error("Failure in deleting the recruiter account")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Error in deleting the profile");
    }
  }

  const deletePopUp = () => {
    window.confirm("Are you sure to delete the account ?")
    deleteAccount()
  }

  return (
    <div className='recruiter-dashboard-section-title-container-full'>
      <section className='recruiter-dashboard-section-title-container'>
        <div onClick={()=>navigate("/recruiter-dashboard")} className='recruiter-dashboard-section-title'>
          <h1 className='recruiter-dashboard-section-title-h1'>Dashboard</h1>
        </div>
        <div onClick={()=>navigate("/recruiter-profile")} className='recruiter-dashboard-section-images'>
          <img className='recruiter-dashboard-section-image-img' src={assets.userprofile} alt="more.png" />
          <h3 className='recruiter-dashboard-section-h3'>Profile</h3>
        </div>
        <div onClick={()=>navigate("/recruiter-update")} className='recruiter-dashboard-section-images'>
          <img className='recruiter-dashboard-section-image-img' src={assets.upduser} alt="more.png" />
          <h3 className='recruiter-dashboard-section-h3'>Update Profile</h3>
        </div>
        <div onClick={()=>navigate("/add-job")}  className='recruiter-dashboard-section-images'>
          <img className='recruiter-dashboard-section-image-img' src={assets.addPost} alt="more.png" />
          <h3 className='recruiter-dashboard-section-h3'>Publish Job</h3>
        </div>
        <div onClick={()=>navigate("/manage-jobs")} className='recruiter-dashboard-section-images'>
          <img className='recruiter-dashboard-section-image-img' src={assets.listJobs} alt="more.png" />
          <h3 className='recruiter-dashboard-section-h3'>Manage Jobs</h3>
        </div>
        <div onClick={()=>navigate("/recruiter-employers")}  className='recruiter-dashboard-section-images'>
          <img className='recruiter-dashboard-section-image-img' src={assets.companiess} alt="more.png" />
          <h3 className='recruiter-dashboard-section-h3'>Employers</h3>
        </div>
        <div onClick={()=>navigate("/view-applications")} className='recruiter-dashboard-section-images'>
          <img className='recruiter-dashboard-section-image-img' src={assets.jobApplication} alt="more.png" />
          <h3 className='recruiter-dashboard-section-h3'>View Applications</h3>
        </div>
        <div onClick={deletePopUp} className='recruiter-dashboard-section-images'>
          <img className='recruiter-dashboard-section-image-img' src={assets.deleting} alt="more.png" />
          <h3 className='recruiter-dashboard-section-h3'>Delete Account</h3>
        </div>
      </section>
    </div>
  )
}

export default RecruiterDashboard
