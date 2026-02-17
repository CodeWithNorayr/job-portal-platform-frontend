import React, { useContext, useState } from 'react'
import "./JobListings.css"
import JobCard from '../JobCard/JobCard'
import Hero from '../Hero/Hero'
import { JobCategories, JobLocation, assets } from '../../assets/assets'
import { StoreContext } from '../../context/AppContext'

const JobListings = () => {
  const { JobsData, searchFilter, setSearchFilter, isSearched, setIsSearched } = useContext(StoreContext)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6

  const [searchCategory, setSearchCategory] = useState([])
  const [searchLocation, setSearchLocation] = useState([])

  const [isClickedCategory, setIsClickedCategory] = useState(false)
  const [isClickedLocation, setIsClickedLocation] = useState(false)

  const onSearchCategory = (category) => {
    setSearchCategory(
      prev => prev.includes(category)
        ?
        prev.filter(c => c != category)
        :
        [...prev, category]
    )
  }

  const onSearchLocation = (location) => {
    setSearchLocation(
      prev => prev.includes(location)
        ?
        prev.filter(c => c != location)
        :
        [...prev, location]
    )
  }

  // Filter JobsData based on searchFilter
  const filteredJobs = JobsData.filter(job =>
    (!searchFilter.title || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())) &&
    (!searchFilter.location || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())) &&
    (searchCategory.length === 0 || searchCategory.includes(job.category)) &&
    (searchLocation.length === 0 || searchLocation.includes(job.location))
  )

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  return (
    <div id='job-listing'>
      <Hero />

      {/* Search tags */}
      <div className='search-tags'>
        {isSearched && searchFilter.title && (
          <div className='search-tag-1'>
            <span>{searchFilter.title}</span>
            <img
              className='search-tag-img-1'
              src={assets.cross}
              alt="X"
              onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
            />
          </div>
        )}

        {isSearched && searchFilter.location && (
          <div className='search-tag-2'>
            <span>{searchFilter.location}</span>
            <img
              className='search-tag-img-2'
              src={assets.cross}
              alt="X"
              onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
            />
          </div>
        )}
      </div>

      <div className='JobListings-context-section'>
        <div className='JobListings-context-filtering-section'>
          <div>
            <div className='filt-loc-sec-div-image'>
              <h3 className='filt-loc-sec-h3'>Search by category</h3>
              <img onClick={()=>setIsClickedCategory((prev)=>prev=!prev)} className='filtering-categories-image-img' src={assets.listings} alt="listings" />
            </div>
            {isClickedCategory && (
              <div className='filtering-categories'>
                  <div className='filtering-categories'>
                    {JobCategories.map(category => (
                      <label key={category}>
                        <input
                          onChange={() => onSearchCategory(category)}
                          type="checkbox"
                          checked={searchCategory.includes(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </div>

              </div>
            )}
          </div>
          <div>
            <div className='filt-loc-sec-div-image'>
              <h3 className='filt-loc-sec-h3'>Filter by location</h3>
              <img className='filtering-location-image-img' onClick={() => setIsClickedLocation((prev) => prev = !prev)} src={assets.listings} alt="listings" />
            </div>
            {isClickedLocation && (
              <div className='filtering-locations'>
                {JobLocation.map(location => (
                  <label key={location}>
                    <input
                      type="checkbox"
                      onChange={() => onSearchLocation(location)}
                      checked={searchLocation.includes(location)}
                    />
                    {location}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <section>
          <h1 className='sectiooon-h1'>
            Find out your job
          </h1>

          <div className='jobcard-section-container-tabel-headers'>
            <p className='jobcard-section-container-tabel-headers-company'>Company</p>
            <p className='jobcard-section-container-tabel-headers-title'>Title</p>
            <p className='jobcard-section-container-tabel-headers-location'>Location</p>
            <p className='jobcard-section-container-tabel-headers-salary'>Salary</p>
            <p className='jobcard-section-container-tabel-headers-level'>Level</p>
            <p className='jobcard-section-container-tabel-headers-category'>Category</p>
          </div>

          <div className='jobcard-section-parting'>
            {filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map(job => (
              <JobCard key={job._id} job={job} />
            ))}

            {/* Pagination */}
            <div className='job-listing-pagination'>
              <button onClick={prevPage} className='job-listing-left'>
                <img className='job-listing-left-icon' src={assets.left} alt="left" />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active-page-123" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button onClick={nextPage} className='job-listing-right'>
                <img className='job-listing-left-icon' src={assets.right} alt="right" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default JobListings
