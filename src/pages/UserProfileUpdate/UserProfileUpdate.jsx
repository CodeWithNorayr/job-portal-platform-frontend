import React, { useContext, useState } from 'react'
import "./UserProfileUpdate.css"
import { StoreContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from "react-toastify"

const UserProfileUpdate = () => {
  const { navigate, backendURL, token } = useContext(StoreContext)
  const [image, setImage] = useState(null)
  const [resume, setResume] = useState(null)
  const [data, setData] = useState({
    name: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name",data.name)
      formData.append("password",data.password)
      if (image) formData.append("image",image)
      if (resume) formData.append("resume",resume)
      const response = await axios.post(`${backendURL}/api/userdetails/userUpdate`,formData,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.success) {
        toast.success(response.data.message || "Successfully updated");
        setData({
          name:"",
          password:""
        })
        setImage(null)
        setResume(null)
        navigate("/user-profile")
      } else {
        toast.error(response.data.message || "Failed to update"); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update"); 
    }
  }

  return (
    <div>
      <div className='userProf-container-section'>
        <img onClick={() => navigate("/user-dashboard")} className='userProf-container-section-image' src={assets.back} alt="back" />
      </div>
      <div className='update-userProfile-section'>
        <div>
          <h1 className='update-userProfile-section-h1'>Update</h1>
        </div>
        <form onSubmit={onSubmitHandler} action="" className='update-userProfile-section-image'>
          <div className='update-userProfile-section-image'>
            <label htmlFor="image">
              <img className='update-userProfile-section-image-img' src={image ? URL.createObjectURL(image) : assets.userprofile} alt="image" />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="image" hidden />
            </label>
            <h3 className='update-userProfile-section-image-img-h3'>Update Image</h3>
          </div>
          <div className='update-userProfile-section-image-name'>
            <h3 className='update-userProfile-section-image-name-h3'>Update Full Name</h3>
            <input onChange={onChangeHandler} className='update-userProfile-section-image-name-input' type="text" name="name" value={data.name} placeholder='Adam Smith' required />
          </div>
          <div className='update-userProfile-section-image-password-context'>
            <h3 className='update-userProfile-section-image-password-h3'>Update Password</h3>
            <input onChange={onChangeHandler} className='update-userProfile-section-image-password-input' type="password" name="password" value={data.password} placeholder='!@#$%****000' required />
          </div>
          <div className='update-userProfile-section-image-resume-context'>
            <label htmlFor="resume">
              <img className='update-userProfile-section-image-resume-context-img' src={assets.cvUploader} alt="cvUploader" />
              <input onChange={(e) => setResume(e.target.files[0])} accept='application/pdf' type="file" name="" id="resume" hidden />
            </label>
            <p className='update-userProfile-section-image-resume-context-h3'>Update CV {`${resume ? resume.name : null}`}</p>
          </div>
          <div className='update-userProfile-section-image-resume-context-btn-full'>
            <button className='update-userProfile-section-image-resume-context-btn' type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfileUpdate
