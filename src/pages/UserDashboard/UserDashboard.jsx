import React, { useContext } from 'react'
import "./UserDashboard.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const UserDashboard = () => {

  const { navigate, backendURL, token, setToken } = useContext(StoreContext)

  const userDelete = async () => {
    try {
      const response = await axios.delete(`${backendURL}/api/userdetails/userDelete/:id`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setToken("")
        localStorage.removeItem("token")
        toast.success("Account is deleted successfully")
        navigate("/")
      } else {
        toast.error("Error in deleting the account")
      }
    } catch (error) {
      toast.error("Error in deleting the account")
    }
  }

  const deleteHandle = () => {
    window.confirm("Are you sure to delete the account")
    userDelete()
  }

  return (
    <div className='userdashboard-section'>
      <div className='userdashboard-section-details'>
        <div>
          <h1 className='userdashboard-section-profile-update'>User Dashboard</h1>
        </div>
        <div onClick={() => navigate("/user-profile")} className='userdashboard-section-profile-update'>
          <img className='userdashboard-section-profile-update-image' src={assets.userthree} alt="userThree" />
          <h3 className='userdashboard-section-profile-update-h3'>Profile</h3>
        </div>
        <div onClick={() => navigate("/user-update")} className='userdashboard-section-profile-update'>
          <img className='userdashboard-section-profile-update-image' src={assets.upduser} alt="upduser" />
          <h3 className='userdashboard-section-profile-update-h3'>Update</h3>
        </div>
        <div onClick={() => navigate("/job-seekers")} className='userdashboard-section-profile-update'>
          <img className='userdashboard-section-profile-update-image' src={assets.staff} alt="staff" />
          <h3 className='userdashboard-section-profile-update-h3'>Job Seekers</h3>
        </div>
        <div onClick={() => navigate("/employers")} className='userdashboard-section-profile-update'>
          <img className='userdashboard-section-profile-update-image' src={assets.companiess} alt="companies" />
          <h3 className='userdashboard-section-profile-update-h3'>Employers</h3>
        </div>
        <div onClick={() => navigate("/users-applications")} className='userdashboard-section-profile-update'>
          <img className='userdashboard-section-profile-update-image' src={assets.applications} alt="apps" />
          <h3 className='userdashboard-section-profile-update-h3'>View User Applications</h3>
        </div>
        <div onClick={() => navigate("/")} className='userdashboard-section-profile-update'>
          <img className='userdashboard-section-profile-update-image' src={assets.jobSearch} alt="search" />
          <h3 className='userdashboard-section-profile-update-h3'>Find Job</h3>
        </div>
        <div onClick={deleteHandle} className='userdashboard-section-profile-update'>
          <img className='userdashboard-section-profile-update-image' src={assets.deleting} alt="deleting" />
          <h3 className='userdashboard-section-profile-update-h3'>Delete Profile</h3>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
