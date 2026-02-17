import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendURL = "https://job-portal-platform-backend-85pf.onrender.com";

  // ===== State =====
  const [JobsData, setJobsData] = useState([]);
  const [recruiterToken, setRecruiterToken] = useState(null);
  const [token, setToken] = useState(null); // user token
  const [authLoading, setAuthLoading] = useState(true); // NEW: loading state
  const [showPopUp, setShowPopUp] = useState(false);
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [alluserData, setAlluserData] = useState([]);

  // ===== Load jobs data =====
  // useEffect(() => setJobsData(JobData), []);

  const fetchAllDataJobs = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/jobdata/jobs`);
      if (response.data.success) {
        setJobsData(response.data.data);
      } else {
        toast.error("Failed to fetch jobs data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    }
  };

  useEffect(()=>{
    fetchAllDataJobs()
  },[])

  // ===== Load tokens from localStorage on mount =====
  useEffect(() => {
    const storedRecruiterToken = localStorage.getItem("recruiterToken");
    const storedUserToken = localStorage.getItem("token");

    if (storedRecruiterToken) setRecruiterToken(storedRecruiterToken);
    if (storedUserToken) setToken(storedUserToken);

    setAuthLoading(false); // done loading
  }, []);

  // ===== Sync tokens to localStorage =====
  useEffect(() => {
    if (recruiterToken) localStorage.setItem("recruiterToken", recruiterToken);
    else localStorage.removeItem("recruiterToken");
  }, [recruiterToken]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // ===== Fetch all users (only if user token exists) =====
  const fetchUserData = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendURL}/api/userdata/getallusers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setAlluserData(response.data.data);
      } else {
        toast.info(response.data.message || "No users found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  // ===== Axios interceptor for recruiterToken =====
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (recruiterToken) {
        config.headers.Authorization = `Bearer ${recruiterToken}`;
      }
      return config;
    });

    return () => axios.interceptors.request.eject(requestInterceptor);
  }, [recruiterToken]);

  // ===== Context value =====
  const value = {
    navigate,
    JobsData,
    setJobsData,
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    showPopUp,
    setShowPopUp,
    recruiterToken,
    setRecruiterToken,
    token,
    setToken,
    backendURL,
    alluserData,
    setAlluserData,
    authLoading
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
