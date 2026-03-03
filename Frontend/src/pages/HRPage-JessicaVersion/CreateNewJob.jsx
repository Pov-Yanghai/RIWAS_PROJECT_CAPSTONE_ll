import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiX, FiBriefcase, FiMapPin, FiDollarSign, FiCalendar } from 'react-icons/fi';
import jobsData from '../data/jobsData';
import { SideBar } from '../components/SideBar';

const CreateNewJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    jobType: 'Full-Time',
    location: '',
    minSalary: '',
    maxSalary: '',
    postedDate: new Date().toISOString().split('T')[0],
    applicationDeadline: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    status: 'Active'
  });

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
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        requirements: newRequirements
      });
    }
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
    if (formData.responsibilities.length > 1) {
      const newResponsibilities = formData.responsibilities.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        responsibilities: newResponsibilities
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that requirements and responsibilities are not empty
    const validRequirements = formData.requirements.filter(req => req.trim() !== '');
    const validResponsibilities = formData.responsibilities.filter(resp => resp.trim() !== '');
    
    if (validRequirements.length === 0) {
      alert('Please add at least one requirement');
      return;
    }
    
    if (validResponsibilities.length === 0) {
      alert('Please add at least one responsibility');
      return;
    }

    const newJob = {
      id: Date.now(),
      ...formData,
      requirements: validRequirements,
      responsibilities: validResponsibilities,
      applicants: 0,
      postedDate: formData.postedDate,
    };
    
    console.log('Creating job:', newJob);
    
    // In a real app, this would save to a database or global state
    // For now, we'll just add it to the local jobsData array
    jobsData.push(newJob);
    
    alert(`Job posting "${newJob.title}" created successfully!`);
    navigate("/job-postings");
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 mr-20">
        <SideBar />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Create New Job Posting</h1>
            <button
              onClick={() => navigate('/job-postings')}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FiArrowLeft />
              <span className="font-semibold">Back</span>
            </button>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
          {/* Preview Card */}
          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <h3 className="text-sm font-bold text-gray-600 mb-3">PREVIEW</h3>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {formData.title || 'Job Title'}
            </h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              <span className="flex items-center gap-1">
                <FiBriefcase className="text-blue-600" />
                {formData.department || 'Department'}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin className="text-blue-600" />
                {formData.location || 'Location'}
              </span>
              {formData.minSalary && formData.maxSalary && (
                <span className="flex items-center gap-1">
                  <FiDollarSign className="text-blue-600" />
                  ${formData.minSalary} - ${formData.maxSalary}
                </span>
              )}
              <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                {formData.jobType}
              </span>
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Engineering"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Phnom Penh, Cambodia"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Salary and Dates */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              Compensation & Timeline
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary Range (USD) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="Minimum"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <span className="text-gray-500 font-semibold">to</span>
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="Maximum"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Posted Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="postedDate"
                  value={formData.postedDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  min={formData.postedDate}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              Job Description
            </h3>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe the job role, what the candidate will do, team culture, growth opportunities..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              required
            />
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              Requirements
            </h3>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                List the key qualifications <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-semibold"
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
                    placeholder={`e.g. 3+ years of experience with React.js`}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              Responsibilities
            </h3>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                What will this person do? <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addResponsibility}
                className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-semibold"
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
                    placeholder={`e.g. Build and maintain user-facing features`}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          <div className="flex gap-3 justify-end pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/job-postings')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-green-500 border-2 border-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-semibold"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewJob;