import React, { useContext, useState } from 'react';
import "./RecruiterRegister.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from "react-toastify";

const RecruiterRegister = () => {
  const { backendURL, setRecruiterToken, navigate } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      
      if (image) formData.append("image", image); // ✅ must match `upload.single("image")` in backend

      const response = await axios.post(
        `${backendURL}/api/companydata/recruiter-registration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.success) {
        setRecruiterToken(response.data.token);
        localStorage.setItem("recruiterToken", response.data.token);
        toast.success("Company registered successfully");
        navigate("/recruiter-login");

        setData({ name: "", email: "", password: "" });
        setImage(null);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error.response || error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='company-register-section'>
      <div className='company-register-div-h1'>
        <h1 className='company-register-divh1'>Company {currState}</h1>
      </div>

      <form onSubmit={onSubmitHandler} className='company-register-form'>
        {/* Company Image */}
        <div className='company-register-image'>
          <label htmlFor="image">
            <img
              className='company-register-image-imgtag'
              src={image ? URL.createObjectURL(image) : assets.userprofile}
              alt="profile"
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
          </label>
          <p className='company-register-image-p'>Upload Company Image</p>
        </div>

        {/* Name */}
        <div className='company-register-name'>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder='GNM LLC'
            required
            className='company-register-name-input'
          />
        </div>

        {/* Email */}
        <div className='company-register-email'>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder='sample@gmail.com'
            required
            className='company-register-email-input'
          />
        </div>

        {/* Password */}
        <div className='company-register-password'>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder='!@#$%^&****000'
            required
            className='company-register-password-input'
          />
        </div>

        {/* Submit Button */}
        <div className='company-register-image'>
          <button className='company-register-button-btn' type='submit'>
            {currState}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterRegister;
