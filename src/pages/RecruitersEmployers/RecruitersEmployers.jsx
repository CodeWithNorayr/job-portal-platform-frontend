import React, { useContext, useState,useEffect } from 'react'
import "./RecruitersEmployers.css"
import { StoreContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from "react-toastify"
import { assets } from '../../assets/assets'

const RecruitersEmployers = () => {
  const { backendURL, navigate } = useContext(StoreContext)
  const [ companyDatas, setCompanyDatas ] = useState([]) 
  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/companydatas/companyData`)
      if(response.data.success){
        setCompanyDatas(response.data.data)
      } else {
        toast.error("Fetching the data is failed")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Fetching the data is failed")
    }
  }
  useEffect(()=>{
    fetchCompanyData()
  },[])



  if (companyDatas.length===0) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div className='userProf-container-section'>
        <img onClick={()=>navigate("/recruiter-dashboard")} className='userProf-container-section-image' src={assets.back} alt="back" />
      </div>
      <div>
        <h1 className='companyDatas-full-section-h1-title'>Employers</h1>
      </div>
      {companyDatas.map((company,index)=>(
        (
          <div className='companyDatas-full-section' key={index}>
            <div className='companyDatas-full-section-image-img'>
              <img className='companyDatas-full-section-image' src={`${company.image}`} alt="compImage" />
            </div>
            <div className='companyDatas-full-section-h1-name'>
              <h1 className='companyDatas-full-section-h1-name-text'>{company.name}</h1>
            </div>
            <div className='companyDatas-full-section-h1-email'>
              <h1 className='companyDatas-full-section-h1-email-h1'>{company.email}</h1>
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default RecruitersEmployers
