import React, { useContext, useEffect, useState } from 'react';
import "./UserProfile.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/AppContext';
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { navigate, backendURL, token,setToken } = useContext(StoreContext);
  const [userData, setUserData] = useState(null);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}/api/userdetails/userDelete/${id}`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      if(response.data.success) {
        setToken("")
        localStorage.removeItem("token")
        toast.success(response.data.message || "Account is deleted successfully")
        navigate("/user-login")
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Account is deleted successfully");
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account ?")){
      deleteUser(userData._id)
    }
  }

  // Fetch user data
  const fetchUserData = async () => {
    if (!token) return; // Don't fetch if no token
    try {
      const response = await axios.get(`${backendURL}/api/userdetails/userid`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [backendURL, token]);

  if (!userData) {
    return <p>Loading user data...</p>; // Show loading state
  }

  return (
    <div className='userProf-container'>
      <div className='userProf-container-section'>
        <img
          onClick={() => navigate("/user-dashboard")}
          className='userProf-container-section-image'
          src={assets.back}
          alt="back"
        />
      </div>
      <div className='userProf-container-section-context'>
        <div className='userProf-container-section-h1-hh'>
          <h1 className='userProf-container-section-h1'>User Profile Page</h1>
        </div>
        <div className='userProf-container-section-img'>
          <img
            className='userProf-container-section-image-img'
            src={userData.image ? `${userData.image}` : assets.userIcon}
            alt={userData.name}
          />
          <h3 className='userProf-container-section-h3'>{userData.name}</h3>
        </div>
        <div className='userProf-container-section-h3-context'>
          <h3 className='userProf-container-section-h33'>{userData.email}</h3>
        </div>
        <div className='userProf-container-section-final'>
          <img className='userProf-container-section-final-img' src={assets.cvUploader} alt="CV" />
          {userData.resume ? (
            <h3 className='userProf-container-section-final-cv-h3'>
              <a
                href={`${userData.resume}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </h3>
          ) : (
            <h3 className='userProf-container-section-final-cv-h3'>No Resume</h3>
          )}
        </div>
        <div className='userProf-container-sec-final-btn-cv-h3-btn-cont'>
          <button onClick={() => navigate("/user-update")} className='userProf-container-sec-final-btn-cv-h3-btn'>
            Update
          </button>
          <button onClick={handleDelete}     className='userProf-container-sec-final-btn-cv-h3-btn-88'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
