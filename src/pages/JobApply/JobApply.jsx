import React, { useContext, useEffect, useState } from "react";
import "./JobApply.css";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const JobApply = () => {
  const { id } = useParams();
  const { JobsData, backendURL, token, recruiterToken, navigate } = useContext(StoreContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // Find job from JobsData
  useEffect(() => {
    if (JobsData?.length) {
      const foundJob = JobsData.find(item => item._id === id);
      setJob(foundJob || null);
    }
  }, [JobsData, id]);

  if (!job) {
    return <p className="jobapply-loading">Loading job details...</p>;
  }

  // Apply for job
  const applyJob = async (jobId) => {
    if (!token) {
      toast.error("Please login to apply");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${backendURL}/api/userdetails/apply-job`,
        {
          jobId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Applied successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jobapply-section-container">
      <h1 className="jobapply-section-container-h1">{job.title}</h1>

      <div className="jobapply-section">
        {/* LEFT SIDE */}
        <section className="jobapply-main">
          <div className="jobapply-company">
            <img
              className="jobapply-company-image-img"
              src={job.company?.image || assets.company}
              alt={job.company?.name || "Company"}
            />
          </div>

          <div className="jobapply-info">
            <h3>{job.company?.name}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Level:</strong> {job.level}</p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <aside className="jobapply-section-cornel">
          <h2 className="jobapply-section-cornel-h2">Job Description</h2>
          <p>{job.description}</p>
        </aside>
      </div>

      {/* ACTION BUTTON */}
      {recruiterToken ? (
        <div
          onClick={() => navigate(`/update-job/${id}`)}
          className="jobapply-section-cornel-btn-context"
        >
          <button className="jobapply-section-cornel-btn">
            Update
          </button>
        </div>
      ) : (
        <div className="jobapply-section-cornel-btn-context">
          <button
            onClick={() => applyJob(job._id)}
            className="jobapply-section-cornel-btn"
            disabled={loading}
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>
      )}
    </div>
  );
};

export default JobApply;
