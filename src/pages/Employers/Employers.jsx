import React, { useContext, useEffect, useState } from "react";
import "./Employers.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Employers = () => {
  const { navigate, backendURL } = useContext(StoreContext);

  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingRecruiters = async () => {
    setLoading(true); // ✅ Start loading

    try {
      const response = await axios.get(
        `${backendURL}/api/companydatas/companyData`
      );

      if (response.data.success) {
        setRecruiters(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch recruiters");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    fetchingRecruiters();
  }, [backendURL]);

  if (loading) return <p>Loading...</p>;

  if (recruiters.length === 0) return <p>No recruiters found</p>;

  return (
    <div className="employers-section-context">
      <div className="userProf-container-section">
        <img
          onClick={() => navigate("/user-dashboard")}
          className="userProf-container-section-image"
          src={assets.back}
          alt="back"
        />
      </div>

      <div className="employers-section-context-h1-div">
        <h1 className="employers-section-context-h1">
          This is the employers page
        </h1>
      </div>

      <div>
        {recruiters.map((recruiter) => (
          <div className="recruiter-section-full-div" key={recruiter._id}>
            <img className="recruiter-section-full-div-image" src={`${recruiter.image}`} alt="image" />
            <h3 className="recruiter-section-full-div-h3-name">{recruiter.name}</h3>
            <h3 className="recruiter-section-full-div-h3-email">{recruiter.email}</h3>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employers;
