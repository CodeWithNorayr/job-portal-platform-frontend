import React, { useContext, useEffect, useState } from 'react';
import "./ManageJobs.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageJobs = () => {
  const navigate = useNavigate();
  const { recruiterToken, backendURL } = useContext(StoreContext);
  const [jobs, setJobs] = useState([]);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!recruiterToken) {
      navigate("/recruiter-login");
    }
  }, [recruiterToken, navigate]);

  // 📥 Fetch posted jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${backendURL}/api/companydata/jobs`,
          {
            headers: {
              Authorization: `Bearer ${recruiterToken}`
            }
          }
        );

        if (data.success) {
          setJobs(data.data);
        } else {
          toast.error("Failed to fetch jobs data");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
      }
    };

    if (recruiterToken) fetchJobs();
  }, [recruiterToken, backendURL]);

  // 👁 Toggle visibility
  const changeVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/companydata/jobs/visibility/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${recruiterToken}`
          }
        }
      );

      if (data.success) {
        toast.success("Visibility updated");

        // Update UI instantly
        setJobs(prev =>
          prev.map(job =>
            job._id === id ? { ...job, visible: data.visible } : job
          )
        );
      } else {
        toast.error("Failed to update visibility");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update visibility");
    }
  };

  // ❌ Delete job
  const deleteJobById = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendURL}/api/companydata/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${recruiterToken}`
          }
        }
      );

      if (data.success) {
        toast.success("Job successfully deleted");

        // Remove job from UI
        setJobs(prev => prev.filter(job => job._id !== id));
      } else {
        toast.error("Failed to delete the job");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete the job");
    }
  };

  // 🧾 Confirmation popup
  const deleteJobPopUp = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this job?");
    if (confirmDelete) {
      deleteJobById(id);
    }
  };

  return (
    <div>
      <div className='userProf-container-section'>
        <img
          onClick={() => navigate("/recruiter-dashboard")}
          className='userProf-container-section-image'
          src={assets.back}
          alt="back"
        />
      </div>

      <div className='manage-jobs-section'>
        <div className='manage-jobs-tabel-grid header'>
          <p className='manage-jobs-tabel-grid-header-title'>Title</p>
          <p className='manage-jobs-tabel-grid-header-location'>Location</p>
          <p className='manage-jobs-tabel-grid-header-salary'>Salary</p>
          <p className='manage-jobs-tabel-grid-header-data'>Date</p>
          <p className='manage-jobs-tabel-grid-header-visible'>Visible</p>
          <p className='manage-jobs-tabel-grid-header-delete'>Delete</p>
        </div>

        {jobs.map(job => (
          <div key={job._id} className='manage-jobs-tabel-grid'>
            <p>{job.title}</p>
            <p className='manage-jobs-tabel-grid-p-location'>{job.location}</p>
            <p className='manage-jobs-tabel-grid-salary'>{job.salary}</p>
            <p className='manage-jobs-tabel-grid-date'>{new Date(job.createdAt).toLocaleDateString()}</p>

            <input
              type="checkbox"
              checked={job.visible}
              onChange={() => changeVisibility(job._id)}
            />
            
            <p><img
              className='assets-delete-icon'
              src={assets.deleting}
              alt="delete"
              onClick={() => deleteJobPopUp(job._id)}
            /></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
