import React, { useContext, useEffect, useState } from "react";
import "./ViewApplications.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const ViewApplications = () => {
  const navigate = useNavigate();

  const { recruiterToken, backendURL } = useContext(StoreContext);

  const [viewApplications, setViewApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Applications
  const fetchingApplications = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${backendURL}/api/view/applications`,
        {
          headers: {
            Authorization: `Bearer ${recruiterToken}`,
          },
        }
      );

      if (response.data.success) {
        setViewApplications(response.data.data);
      } else {
        toast.error("No applications found");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch when recruiter token exists
  useEffect(() => {
    if (recruiterToken) {
      fetchingApplications();
    }
  }, [recruiterToken, backendURL]);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!recruiterToken) {
      navigate("/recruiter-login");
    }
  }, [recruiterToken, navigate]);

  // ✅ Loading State
  if (loading) return <p>Loading applications...</p>;

  // ✅ Empty State
  if (viewApplications.length === 0)
    return <p>No applications yet.</p>;

  return (
    <div className="view-applications-page">
      {/* Back Button */}
      <div className="userProf-container-section">
        <img
          onClick={() => navigate("/recruiter-dashboard")}
          className="userProf-container-section-image"
          src={assets.back}
          alt="back"
        />
      </div>

      {/* Page Title */}
      <h1 className="view-applications-title">View Applications</h1>

      {/* Applications List */}
      <div className="applications-list">
        {viewApplications.map((application) => (
          <div key={application._id} className="application-card">
            {/* Applicant Info */}
            <p>
              <b>{application?.userId?.name || "Unknown User"}</b> applied for{" "}
              <b>{application?.jobId?.title || "Unknown Job"}</b>
            </p>

            {/* Job Info */}
            <p>
              Salary: <b>{application?.jobId?.salary || "Not specified"}</b>
            </p>

            <p>
              Date:{" "}
              <b>
                {application?.jobId?.date
                  ? new Date(application.jobId.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "No date"}
              </b>
            </p>

            <p>
              Location: <b>{application?.jobId?.location || "Not specified"}</b>
            </p>

            <p>
              Category: <b>{application?.jobId?.category || "Not specified"}</b>
            </p>

            <p>
              Level: <b>{application?.jobId?.level || "Not specified"}</b>
            </p>

            {/* Resume Section */}
            {application?.userId?.resume && (
              <div className="resume-section">
                <span>
                  <b>Resume:</b>
                </span>

                <a
                  href={`${application.userId.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="resume-icon"
                    src={assets.cvUploader}
                    alt="cv"
                  />
                </a>

                <p className="resume-file">
                  {application.userId.resume}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;
