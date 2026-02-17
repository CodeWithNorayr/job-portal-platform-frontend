import React, { useContext, useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { toast } from "react-toastify";
import { StoreContext } from '../../context/AppContext';

const Login = () => {
  const [currState] = useState("Sign In");
  const [data, setData] = useState({ email: "", password: "" });

  const { backendURL, setToken, navigate } = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/userdetails/userLogin`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token); // persist token
        toast.success("Logged in successfully");
        navigate("/user-profile"); // navigate after token is set
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='user-profile-login'>
      <h1 className='user-profile-login-h1'>Login Page</h1>
      <form onSubmit={onSubmitHandler}>
        <div className='user-profile-uploader-email'>
          <p>Email</p>
          <input
            onChange={onChangeHandler}
            className='user-profile-uploader-input'
            placeholder='sample@gmail.com'
            type="email"
            name="email"
            value={data.email}
          />
        </div>
        <div className='user-profile-uploader-password'>
          <p>Password</p>
          <input
            onChange={onChangeHandler}
            className='user-profile-uploader-input'
            placeholder='1!@#$*****'
            type="password"
            name="password"
            value={data.password}
          />
        </div>
        <button className='user-profile-uploader-button-login' type="submit">{currState}</button>
      </form>
    </div>
  );
};

export default Login;
