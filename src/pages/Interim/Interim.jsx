import React, { useContext } from 'react'
import "./Interim.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/AppContext'

const Interim = () => {
  const { navigate } = useContext(StoreContext)
  return (
    <div className='interim-images-section'>
        <div onClick={()=>navigate("/user-registration")} className='interim-images-section-1'>
          <img className='interim-images-section-1' src={assets.register} alt="register" />
        </div>
        <div onClick={()=>navigate("/user-login")} className='interim-images-section-2'>
          <img className='interim-images-section-2' src={assets.login} alt="login" />
        </div>
    </div>
  )
}

export default Interim
