import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from "/src/assets/assets.js";
import { StoreContext } from '../../context/AppContext'
import { toast } from 'react-toastify';

const Navbar = () => {
  const { navigate, recruiterToken, token, setToken, setRecruiterToken } = useContext(StoreContext)

  const isUserLoggedIn = !!token
  const isRecruiterLoggedIn = !!recruiterToken

  const [isClicked, setIsClicked] = useState(false)

  const logoutUser = () => {
    setToken("")
    localStorage.removeItem("token")
    toast.success("Logged out")
    navigate("/")
  }

  const logoutRecruiter = () => {
    setRecruiterToken("")
    localStorage.removeItem("recruiterToken")
    toast.success("Logged out")
    navigate("/")
  }

  return (
    <div className="navbar-context-section">
      <div className='navbar-section'>
        {/* Left side */}
        <div className='navbar-left-side'>
          <h1
            onClick={() => navigate('/')}
            className='navbar-left-side-h1'
          >
            Job Portal
          </h1>

        </div>
        <div className='navbar-section-cornelpart'>
          <img
            onClick={() => setIsClicked((prev) => !prev)}
            className='navbar-image'
            src={assets.listings}
            alt="nav-image"
          />
          {isClicked && (
            <div className='navbar-isClicked-section'>
              {/* Right side buttons */}
              <div className='navbar-right-btn'>

                <button type='button' onClick={() => navigate('/')} className='navbar-right-btn-login'>Jobs</button>
                {/* Regular user buttons */}
                {isUserLoggedIn && !isRecruiterLoggedIn && (
                  <>
                    <button onClick={() => navigate('/user-profile')} className='navbar-right-btn-login' type='button'>Profile</button>
                    <button onClick={() => navigate('/user-dashboard')} className='navbar-right-btn-login' type='button'>Dashboard</button>
                    <button onClick={logoutUser} className='navbar-right-btn-register' type='button'>Logout</button>
                  </>
                )}

                {/* Recruiter buttons */}
                {isRecruiterLoggedIn && !isUserLoggedIn && (
                  <>
                    <button onClick={() => navigate('/recruiter-profile')} className='navbar-right-btn-login' type='button'>Profile</button>
                    <button onClick={() => navigate('/recruiter-dashboard')} className='navbar-right-btn-login' type='button'>Dashboard</button>
                    <button onClick={logoutRecruiter} className='navbar-right-btn-register' type='button'>Logout</button>
                  </>
                )}

                {/* Guest buttons */}
                {!isUserLoggedIn && !isRecruiterLoggedIn && (
                  <>
                    <button onClick={() => navigate('/intermediator')} className='navbar-right-btn-login' type='button'>Login</button>
                    <button onClick={() => navigate('/intermediator')} className='navbar-right-btn-register' type='button'>Register</button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Context section for users (not recruiters) */}
      {!isRecruiterLoggedIn && !isUserLoggedIn && (
        <div className='navbar-context'>
          <h1 className='navbar-context-h1'>Jobs</h1>
        </div>
      )}
    </div>
  )
}

export default Navbar
