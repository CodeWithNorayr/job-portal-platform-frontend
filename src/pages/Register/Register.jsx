import React, { useContext, useState } from 'react';
import "./Register.css";
import { assets } from '../../assets/assets';
import axios from "axios";
import { StoreContext } from '../../context/AppContext';
import { toast } from "react-toastify";

const Register = () => {
  const { backendURL, navigate, setToken } = useContext(StoreContext);

  const [currState] = useState("Sign Up");
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [data, setData] = useState({ name: "", email: "", password: "" });

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
      if (image) formData.append("image", image);
      if (resume) formData.append("resume", resume);

      const response = await axios.post(`${backendURL}/api/userdetails/userRegistration`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        toast.success("User registered successfully");
        navigate("/user-login");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='user-profile-section'>
      <h1 className='user-profile-uploader-h1'>{currState}</h1>
      <form onSubmit={onSubmitHandler} className='user-profile-form'>
        <div className='user-profile-uploader-image'>
          <label htmlFor="image">
            <img className='user-profile-uploader' src={image ? URL.createObjectURL(image) : assets.userprofile} alt="upload user profile" />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          <p className='user-profile-uploader-p'>Upload a profile picture</p>
        </div>
        <div className='user-profile-uploader-name'>
          <p>User FullName</p>
          <input onChange={onChangeHandler} className='user-profile-uploader-input' placeholder='Joseph Smith' type="text" name="name" value={data.name} />
        </div>
        <div className='user-profile-uploader-email'>
          <p>Email</p>
          <input onChange={onChangeHandler} className='user-profile-uploader-input' placeholder='sample@gmail.com' type="email" name="email" value={data.email} />
        </div>
        <div className='user-profile-uploader-password'>
          <p>Password</p>
          <input onChange={onChangeHandler} className='user-profile-uploader-input' placeholder='1!@#$*****' type="password" name="password" value={data.password} />
        </div>
        <div className='cv-uploader-user'>
          <label htmlFor="resume">
            <img className='user-profile-uploader-p-cv-image' src={assets.cvUploader} alt="CV upload" />
            <input onChange={(e) => setResume(e.target.files[0])} accept='application/pdf' type="file" id="resume" hidden />
          </label>
          <p className='user-profile-uploader-p-cv'>Upload CV {resume ? ` / ${resume.name}` : ""}</p>
        </div>
        <button className='user-profile-uploader-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
