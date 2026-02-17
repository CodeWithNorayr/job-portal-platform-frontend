import React, { useContext, useState } from 'react'
import "./JobSeekers.css"
import { StoreContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const JobSeekers = () => {
  const { alluserData, setAlluserData, backendURL, navigate } = useContext(StoreContext)
  return (
    <div>
      <div className='userProf-container-section'>
        <img onClick={()=>navigate("/user-dashboard")} className='userProf-container-section-image' src={assets.back} alt="back" />
      </div>
    <div className='jobseekers-section'>
      <div className='jobseekers-section-middle'>
        <p className='jobseekers-section-p'>Picture</p>
        <p className='jobseekers-section-p'>Name</p>
        <p className='jobseekers-section-p-email'>Email</p>
        <p className='jobseekers-section-p'>CV</p>
      </div>
      <div className='jobseekerssection-cornel-context'>
      {alluserData.map((user,index)=>(
          (
            <div className='jobseekerssection-cornel' key={index}>
              <div className='jobseekerssection-cornel-image-img'>
                <img className='jobseekerssection-cornel-image' src={`${user.image}`} alt="images" />
              </div>
              
                <h1 className='jobseekerssection-cornel-img-h1'>{user.name}</h1>
                <h1 className='jobseekerssection-cornel-img-h1-email'>{user.email}</h1>
              
              {user.resume && (
              <p className='jobseekerssection-cornel-p'>
                Resume:{" "}
                <a
                  href={`${user.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className='jobseekerssection-cornel-img-cvimage' src={assets.cvUploader} alt="cv" />
                </a>
              </p>
            )}
            </div>
          )
        ))}
      </div>
    </div>
    </div>
  )
}

export default JobSeekers
