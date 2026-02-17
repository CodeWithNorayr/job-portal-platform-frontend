import React, { useContext, useEffect, useState } from 'react'
import "./Profile.css"
import axios from "axios"
import { toast } from "react-toastify"
import { StoreContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Profile = () => {
  const { backendURL, recruiterToken, setRecruiterToken, authLoading, navigate } = useContext(StoreContext)
  const [companyData, setCompanyData] = useState(null)

  const fetchCompanyData = async () => {
    if (!recruiterToken) return;
    try {
      const response = await axios.get(
        `${backendURL}/api/companydata/company`,
        {
          headers: {
            Authorization: `Bearer ${recruiterToken}`
          }
        }
      );
      if (response.data.success) {
        setCompanyData(response.data.data);
      } else {
        toast.error("Error in fetching the profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error in fetching the profile");
    }
  };

  useEffect(() => {
    if (!authLoading && recruiterToken) {
      fetchCompanyData();
    }
  }, [authLoading, recruiterToken]);

  const deleteCompany = async () => {
    try {
      const response = await axios.delete(`${backendURL}/api/companydata/company`,{ 
        headers:{
          "Authorization":`Bearer ${recruiterToken}`
        }
      })
      if ( response.data.success ) {
        setRecruiterToken("")
        localStorage.removeItem("recruiterToken")
        toast.success("Account is deleted successfully")
        navigate("/recruiter-login")
      } else {
        toast.error("Error in deleting the account")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Error in deleting the account")
    }
  }

  const deletePopUp = () => {
    window.confirm("Are you really want to delete the account ?")
    deleteCompany()
  }

  // ✅ VERY IMPORTANT GUARD
  if (authLoading || !companyData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div className='userProf-container-section'>
        <img onClick={()=>navigate("/recruiter-dashboard")} className='userProf-container-section-image' src={assets.back} alt="back" />
      </div>
    <div className='Profile-page-section'>
      <h1>Profile</h1>

      <div className='Profile-page-section-image-img'>
        <img
          className='Profile-page-section-image-img-details'
          src={`${companyData.image}`}
          alt="Company"
        />
      </div>

      <h1>{companyData.name}</h1>
      <h1>{companyData.email}</h1>

      <div className='Profile-page-section-image-img-button'>
        <button className='Profile-page-section-image-img-button-upload' onClick={()=>navigate("/recruiter-update")} type="button">Update</button>
        <button onClick={()=>deletePopUp(companyData._id)} className='Profile-page-section-image-img-button-delete' type="button">Delete</button>
      </div>
    </div>
    </div>
  )
}

export default Profile
