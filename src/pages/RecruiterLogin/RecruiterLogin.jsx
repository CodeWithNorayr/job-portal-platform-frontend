import React, { useContext, useState } from 'react'
import "./RecruiterLogin.css"
import axios from "axios"
import { StoreContext } from '../../context/AppContext'
import { toast } from "react-toastify"

const RecruiterLogin = () => {
  const { backendURL, setRecruiterToken, navigate } = useContext(StoreContext)

  const [ data, setData ] = useState({
    email:"",
    password:""
  })

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${backendURL}/api/companydata/recruiter-login`,
        data
      )

      if (response.data.success) {
        setRecruiterToken(response.data.token)
        localStorage.setItem("recruiterToken", response.data.token)
        toast.success("Company logged in successfully")
        navigate("/recruiter-dashboard")
      } else {
        toast.error("Login failed")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className='company-register-section'>
      <div className='company-register-div-h1'>
        <h1 className='company-register-divh1'>Company Login</h1>
      </div>

      <form onSubmit={onSubmitHandler} className='company-register-form'>
        <div className='company-register-email'>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className='company-register-password'>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button className='company-register-button-btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default RecruiterLogin
