import React, { useContext, useState } from 'react'
import "./ShowPopUp.css"
import { StoreContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const ShowPopUp = () => {
  const { showPopUp, setShowPopUp } = useContext(StoreContext)
  return (
    <div className='showPopUp-context'>
      <div className='showPopUp-h1'>
        <h1>User/Recruiter</h1>
        <p onClick={()=>setShowPopUp(false)}>X</p>
      </div>
      <div className='showPopUp-images'>
        <img src={assets.worker} alt="worker" />
        <img src={assets.talentManagement} alt="employee" />
      </div>
    </div>
  )
}

export default ShowPopUp
