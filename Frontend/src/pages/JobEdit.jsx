import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi';
import jobsData from '../data/jobsData';
// import {SideBar} from '../components/SideBar';

const EditJobPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    jobType: 'Full-Time',
    location: '',
    minSalary: '',
    maxSalary: '',
    postedDate: '',
    applicationDeadline: '',
    description: '',
    requirements: [''],
    responsibilities: ['']
  });

  useEffect(() => {
    const job = jobsData.find(j => j.id === parseInt(jobId));
    if (job) {
      // Convert date format from DD/MM/YYYY to YYYY-MM-DD for input[type="date"]
      const formatDateForInput = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
      };

      setFormData({
        title: job.title,
        department: job.department,
        jobType: job.jobType,
        location: job.location,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        postedDate: formatDateForInput(job.postedDate),
        applicationDeadline: formatDateForInput(job.applicationDeadline),
        description: job.description,
        requirements: job.requirements,
        responsibilities: job.responsibilities
      });
    }
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({
      ...formData,
      responsibilities: newResponsibilities
    });
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, '']
    });
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = formData.responsibilities.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      responsibilities: newResponsibilities
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save to backend/state
    console.log('Updating job:', formData);
    alert('Job posting updated successfully!');
    navigate(`/job-postings/view/${jobId}`);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gray-50 ">
      <div className="max-w-7xl mx-auto p-6 mr-20 ">
          {/* <SideBar /> */}
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Edit Job Posting</h1>
          <button
            onClick={() => navigate(`/job-postings/view/${jobId}`)}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
          {/* Title and Department */}
          <div className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. IT"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Job Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type *</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Phnom Penh, Cambodia"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="Min"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <span className="flex items-center">-</span>
                <input
                  type="number"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="Max"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Posted Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Posted Date *</label>
              <input
                type="date"
                name="postedDate"
                value={formData.postedDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Application Deadline *</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe the job role, responsibilities, and what makes this position unique..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              required
            />
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">Requirements *</label>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-1 text-primary hover:text-primary-hover text-sm font-semibold"
              >
                <FiPlus /> Add Requirement
              </button>
            </div>
            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiX className="text-xl" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">Responsibilities *</label>
              <button
                type="button"
                onClick={addResponsibility}
                className="flex items-center gap-1 text-primary hover:text-primary-hover text-sm font-semibold"
              >
                <FiPlus /> Add Responsibility
              </button>
            </div>
            <div className="space-y-3">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    placeholder={`Responsibility ${index + 1}`}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiX className="text-xl" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate(`/job-postings/view/${jobId}`)}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-black rounded-xl transition-colors font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;