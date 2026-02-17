import React, { useContext } from 'react'
import "./Intermediator.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/AppContext'

const Intermediator = () => {
  const { navigate } = useContext(StoreContext)
  return (
    <div className='interim-section-container'>
      <div className='interim-h1'>
        <h1 className='interim-section-container-h1'>Enter as an employer or an employee</h1>
      </div>
      <div className='interim-img-section'>
        <div className='interim-img'>
          <div onClick={() => navigate("/interim")} className='interim-img-1div'>
            <img className='interim-img-1' src={assets.worker} alt="worker" />
            <h3 className='interim-img-h3-1'>Employees</h3>
          </div>
          <div onClick={() => navigate("/interimtwo")} className='interim-img-2div'>
            <img className='interim-img-2' src={assets.talentManagement} alt="employee" />
            <h3 className='interim-img-h3-2'>Employers</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intermediator
