import React, { useContext, useEffect, useState } from 'react'
import "./UsersApplications.css"
import { StoreContext } from '../../context/AppContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const UsersApplications = () => {
  const { navigate, backendURL, token } = useContext(StoreContext)
  const [applications, setApplications] = useState([])

  const fetchUserApplications = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendURL}/api/userdetails/user-applications`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setApplications(response.data.data)
      } else {
        toast.error("No application is found")
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch applications");
    }
  }

  useEffect(() => {
    fetchUserApplications()
  }, [backendURL, token])


  return (
    <div>
      <div className='userProf-container-section'>
        <img
          onClick={() => navigate("/user-dashboard")}
          className='userProf-container-section-image'
          src={assets.back}
          alt="back"
        />
      </div>
      <div className='application-section-details-full'>
        {applications.length === 0 && <p>No applications found</p>}
        <div className='application-section-details-div'>
          {applications.map((application, index) => (
            (
              <div className='application-section-details'>
                <div key={index} className='application-section-details-end'>
                  <img className='application-section-details-image' src={`${application.companyId?.image}`} alt="image-company" />
                  <h3><span>Name</span> : {application.companyId?.name}</h3>
                  <h3><span>Email</span> : {application.companyId?.email}</h3>
                  <h3><span>Title</span> : {application.jobId?.title || "Job Title Missing"}</h3>
                  <h3><span>Location</span> : {application.jobId?.location}</h3>
                  <h3><span>Category</span> : {application.jobId?.category}</h3>
                  <h3><span>Salary</span> : {application.jobId?.salary}$</h3>
                  <h3><span>Description</span> : {application.jobId?.description}</h3>
                  <h3><span>Created at</span> : {application.jobId?.createdAt}</h3>
                  <h3><span>Updated at</span> : {application.jobId?.updatedAt}</h3>
                  <a href={`${application.userId?.resume}`}>
                    <img className='cvUploader-cs' src={assets.cvUploader} alt="resume" />
                  </a>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default UsersApplications
