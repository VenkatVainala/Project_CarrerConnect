// frontend/src/pages/Jobs/JobListingPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobListingPage.css';

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        if (response.data.success) {
          setJobs(response.data.data);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(filter.toLowerCase()) ||
      job.company.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-listing-page container">
      <h1>Job Listings</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                {job.company.logo && (
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="company-logo"
                  />
                )}
                <h2>{job.title}</h2>
              </div>
              <p className="company">
                {job.company.name} | {job.location}
              </p>
              <p className="description">
                {job.description.slice(0, 150)}...
              </p>
              <a
                href={job.applyMethod.companyApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobListingPage;
