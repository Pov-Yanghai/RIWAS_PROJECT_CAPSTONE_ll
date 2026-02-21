import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobsData from '../../data/jobsData';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = jobsData.find((j) => j.id === parseInt(jobId));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <button
            onClick={() => navigate('/view-jobs')}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      <div className="max-w-7xl mx-auto">

        {/* PAGE TITLE + green underline + Close button */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Job Details</h1>
            <button
              onClick={() => navigate('/view-jobs')}
              className="px-5 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
          <div className="mt-2 h-0.5 w-full bg-green-500 rounded" />
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-xl shadow-sm p-8">

          {/* Job title + Apply button */}
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
            <button
              onClick={() => navigate(`/apply-job/${job.id}`)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold shrink-0 ml-4"
            >
              Apply
            </button>
          </div>

          {/* Department */}
          <p className="text-gray-700 text-sm mb-8">
            <span className="font-medium">Department:</span> {job.department}
          </p>

          {/* Info fields grid — 3 cols top row, 2 cols second row */}
          <div className="grid grid-cols-3 gap-5 mb-5">
            {/* Job Type */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Job Type</label>
              <div className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white">
                {job.jobType || "—"}
              </div>
            </div>
            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Location</label>
              <div className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white">
                {job.location || "—"}
              </div>
            </div>
            {/* Salary Range */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Salary Range</label>
              <div className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white">
                {job.salaryRange || "—"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            {/* Posted Date */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Posted Date</label>
              <div className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white">
                {job.postedDate || "—"}
              </div>
            </div>
            {/* Application Deadline */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Application Deadline</label>
              <div className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white">
                {job.deadline || "—"}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Job Description</label>
            <div className="px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 leading-relaxed bg-white">
              {job.description || "—"}
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-7">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Requirements</label>
            <div className="px-4 py-3 border border-gray-200 rounded-lg bg-white">
              <ul className="space-y-1.5">
                {job.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-0.5">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Responsibilities</label>
            <div className="px-4 py-3 border border-gray-200 rounded-lg bg-white">
              <ul className="space-y-1.5">
                {job.responsibilities?.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-0.5">•</span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;