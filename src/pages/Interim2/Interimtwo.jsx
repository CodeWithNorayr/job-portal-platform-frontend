import React, { useContext } from 'react'
import "./Interimtwo.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/AppContext'

const Interimtwo = () => {
  const { navigate } = useContext(StoreContext)
  return (
    <div className='interim-images-section'>
      <img onClick={()=>navigate("/recruiter-registration")}  className='interim-images-section-1' src={assets.register} alt="register" />
      <img onClick={()=>navigate("/recruiter-login")} className='interim-images-section-2' src={assets.login} alt="login" />
    </div>
  )
}

export default Interimtwo
