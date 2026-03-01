import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobsData from '../../data/jobsData';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [selectedCV, setSelectedCV] = useState('');
  const [cvFile, setCvFile] = useState(null);

  const job = jobsData.find((j) => j.id === parseInt(jobId));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <button onClick={() => navigate('/view-jobs')} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCvFile(file);
  };

  const handleSubmit = () => {
    const application = {
      jobId: job.id,
      jobTitle: job.title,
      appliedDate: new Date().toLocaleDateString('en-GB'),
      status: 'Application',
      cv: selectedCV || cvFile?.name,
    };
    const existing = JSON.parse(localStorage.getItem('applications') || '[]');
    if (existing.some(app => app.jobId === job.id)) {
      alert('You have already applied for this position!');
      navigate('/application');
      return;
    }
    existing.push(application);
    localStorage.setItem('applications', JSON.stringify(existing));
    navigate('/application');
  };

  // small reusable field box
  const InfoBox = ({ label, value }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      <div className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white">
        {value || "—"}
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      <div className="max-w-7xl mx-auto">

        {/* PAGE TITLE + green underline */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h1>
          <div className="mt-2 h-0.5 w-full bg-green-500 rounded" />
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="flex gap-6 items-start">

          {/* LEFT — Job details */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-8">

            {/* Job title + department */}
            <h2 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h2>
            <p className="text-sm text-gray-600 mb-7">Department: {job.department}</p>

            {/* Job Type + Location */}
            <div className="grid grid-cols-2 gap-5 mb-5">
              <InfoBox label="Job Type" value={job.jobType} />
              <InfoBox label="Location" value={job.location} />
            </div>

            {/* Salary Range — full width */}
            <div className="mb-5">
              <InfoBox label="Salary Range" value={job.salaryRange} />
            </div>

            {/* Deadline + Posted Date */}
            <div className="grid grid-cols-2 gap-5 mb-7">
              <InfoBox label="Application Deadline" value={job.deadline} />
              <InfoBox label="Posted Date" value={job.postedDate} />
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Job Description</label>
              <div className="px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 leading-relaxed bg-white min-h-[80px]">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Requirements</label>
              <div className="px-4 py-3 border border-gray-200 rounded-lg bg-white">
                <ul className="space-y-1.5">
                  {job.requirements?.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 mt-0.5">•</span>{req}
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
                  {job.responsibilities?.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 mt-0.5">•</span>{resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT — Select Resume */}
          <div className="w-80 shrink-0 bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Select Your Resume</h3>

            {/* CV dropdown */}
            <div className="mb-6">
              <div className="relative">
                <select
                  value={selectedCV}
                  onChange={(e) => { setSelectedCV(e.target.value); setCvFile(null); }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 appearance-none outline-none cursor-pointer"
                >
                  <option value="">Select Your CV</option>
                  <option value="Eng_Mengeang_Resume.pdf">Eng_Mengeang_Resume.pdf</option>
                  <option value="John_Doe_CV.pdf">John_Doe_CV.pdf</option>
                  <option value="Jane_Smith_Resume.pdf">Jane_Smith_Resume.pdf</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">▼</span>
              </div>
            </div>

            {/* Back + Apply buttons */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={() => navigate('/view-jobs')}
                className="flex-1 py-2.5 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Upload file option */}
            <label className="block cursor-pointer">
              <input type="file" onChange={handleCVUpload} className="hidden" accept=".pdf,.doc,.docx" />
              {cvFile && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 mt-2">
                  <p className="font-semibold">File Selected:</p>
                  <p className="mt-0.5">{cvFile.name}</p>
                </div>
              )}
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplyJob;