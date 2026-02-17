import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import "./RecruiterUpdate.css"

const RecruiterUpdate = () => {
  const { backendURL, recruiterToken, navigate } = useContext(StoreContext)
  const [ image, setImage ] = useState(null)
  const [ data, setData ] = useState({
    name:"",
    password:""
  })
  const onChangeHandler = (  event ) => {
    const name = event.target.name
    const value = event.target.value
    setData((data)=>({...data,[name]:value}))
  }

  const onSubmitHandle = async ( event ) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name",data.name)
      formData.append("password",data.password)
      if(image) formData.append("image",image)
      const response = await axios.put(`${backendURL}/api/companydata/company-update`,formData,{
        headers:{
          "Authorization":`Bearer ${recruiterToken}`
        }
      })
      if ( response.data.success ) {
        toast.success("Updated successfully")
        navigate("/recruiter-profile")
        setData({
          name:"",
          password:""
        })
        setImage(null)
      } else {
        toast.error("Profile update is failed")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Profile update is failed")
    }
  }

  return (
    <div>
     <div className='userProf-container-section'>
        <img onClick={()=>navigate("/recruiter-dashboard")} className='userProf-container-section-image' src={assets.back} alt="back" />
      </div>
    <div className='form-submit-section-all'>
        <div>
          <h1>Update</h1>
        </div>
        <form onSubmit={onSubmitHandle} className='form-submit-section'>
          <div className='form-submit-section-image-uploader'>
            <label htmlFor="image">
              <img className='form-submit-section-image-uploader-img' src={image ? URL.createObjectURL(image):assets.userprofile} alt="image" />
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="image" id='image' hidden/>
            </label>
            <p>Update Image</p>
          </div>
          <div className='name-sec-content'>
            <h3>Company Name</h3>
            <input className='name-sec-content-input' onChange={onChangeHandler} type="text" name="name" value={data.name} id="name" placeholder="!@#$%^&***003" required/>
          </div>
          <div className='password-sec-content'>
            <h3>Password</h3>
            <input className='password-sec-content-input' onChange={onChangeHandler} type="password" name="password" value={data.password} id="password" placeholder="!@#$%^&***000" required/>
          </div>
          <div className='button-btn-sect'>
            <button className='button-btn-sect-submit' type="submit">Save</button>
          </div>
      </form>
    </div>
    </div>
  )
}

export default RecruiterUpdate
