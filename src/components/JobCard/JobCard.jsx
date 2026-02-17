import React, { useContext } from 'react';
import "./JobCard.css";
import { StoreContext } from '../../context/AppContext';

const JobCard = ({ job }) => {
  const { navigate, backendURL } = useContext(StoreContext);

  // Safety: make sure company data exists
  const company = job?.company || {};
  const companyImage = company.image ? `${company.image}` : "/default-image.png"; // fallback image

  return (
    <div className='jobcard-section-container'>
      <div className='jobcard-section-container-side-cornel'>
        <img
          onClick={() => navigate(`/apply-job/${job._id}`)}
          className='jobcard-section-container-img-side-image'
          src={companyImage}
          alt={company.name || "Company"}
        />
        <h3 className='jobcard-section-container-context-1-side-title'>{job.title}</h3>
        <h3 className='jobcard-section-container-context-1-side-location'>{job.location}</h3>
        <h3 className='jobcard-section-container-context-1-side-salary'>{job.salary || "N/A"}</h3>
        <h3 className='jobcard-section-container-context-1-side-level'>{job.level || "N/A"}</h3>
        <h3 className='jobcard-section-container-context-1-side-category'>{job.category || "N/A"}</h3>
        <hr />
      </div>
    </div>
  );
};

export default JobCard;
