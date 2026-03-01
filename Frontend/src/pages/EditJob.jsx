import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import jobsData from '../data/jobsData';
import SideBar from '../components/SideBar';
const EditJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Form state
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    jobType: 'Full Time',
    minSalary: '',
    maxSalary: '',
    postedDate: '',
    applicationDeadline: '',
    location: '',
    jobDescription: '',
    requirements: ''
  });

  // Load job data when component mounts
  useEffect(() => {
    const job = jobsData.find(j => j.id === parseInt(jobId));
    
    if (job) {
      setFormData({
        jobTitle: job.title,
        department: job.department,
        jobType: job.jobType,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        postedDate: job.postedDate,
        applicationDeadline: job.applicationDeadline,
        location: job.location,
        jobDescription: job.description,
        requirements: job.requirements.join('\n')
      });
    }
  }, [jobId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated job data:', formData);
    // In a real application, you would send this data to an API
    alert('Job posting updated successfully!');
    navigate('/job-postings');
  };

  // Handle close/cancel
  const handleClose = () => {
    navigate('/job-postings');
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gray-50 ">
      <div className="max-w-7xl mx-auto p-6 mr-20 ">
        <SideBar />
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Edit Posted</h1>
          <button
            onClick={handleClose}
            className="w-12 h-12 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
          >
            <FiX className="text-white text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-green-500">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Enter job title"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Enter department"
                  required
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors appearance-none bg-white"
                  required
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Min Salary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Min Salary
                </label>
                <input
                  type="text"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="1000$"
                  required
                />
              </div>

              {/* Max Salary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Salary
                </label>
                <input
                  type="text"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="2000$"
                  required
                />
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-green-500">
              Job Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Posted Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Posted Date
                </label>
                <input
                  type="date"
                  name="postedDate"
                  value={formData.postedDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description & Requirement Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-green-500">
              Description & Requirement
            </h2>

            {/* Job Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors resize-none"
                placeholder="Enter job description"
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirements
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="8"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors resize-none"
                placeholder="Enter requirements (one per line)"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;