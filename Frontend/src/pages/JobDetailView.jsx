
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import jobsData from '../data/jobsData';
import SideBar from '../components/SideBar';

const JobDetailView = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const foundJob = jobsData.find(j => j.id === parseInt(jobId));
    setJob(foundJob);
  }, [jobId]);

  // Handle Edit - Navigate to Edit page
  const handleEdit = () => {
    navigate(`/edit-job/${jobId}`);
  };

  // Handle Delete - Show confirmation modal
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    // In a real app, you would delete from database here
    console.log('Job deleted:', job.title);
    setShowDeleteModal(false);
    navigate('/job-postings');
  };

  // Cancel Delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gray-50 ">
      <div className="max-w-7xl mx-auto p-6 mr-20 ">
        <SideBar />
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Job Details</h1>
          <button
            onClick={() => navigate('/job-postings')}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Title and Department */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
              <p className="text-xl text-gray-600">Department: {job.department}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Job Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-900">{job.jobType}</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-900">{job.location}</p>
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-900">{job.minSalary}$ - {job.maxSalary}$</p>
              </div>
            </div>

            {/* Posted Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Posted Date</label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-900">{job.postedDate}</p>
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Application Deadline</label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-900">{job.applicationDeadline}</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
            <div className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-900 leading-relaxed">{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
            <div className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg">
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-900">
                    <span className="text-gray-900">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Responsibilities</label>
            <div className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg">
              <ul className="space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-900">
                    <span className="text-gray-900">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in duration-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Job Posting</h2>
                <p className="text-gray-600">
                  Are you sure you want to delete the job posting for{' '}
                  <span className="font-semibold text-gray-900">{job?.title}</span>?
                </p>
                <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailView;