import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';

const stages = [
  { name: 'Application',  color: '#a78bfa' }, // purple
  { name: 'Screening',    color: '#67e8f9' }, // cyan
  { name: 'Interview',    color: '#6ee7b7' }, // teal
  { name: 'Assessment',   color: '#93c5fd' }, // blue
  { name: 'References',   color: '#fcd34d' }, // yellow
  { name: 'Decision',     color: '#f97316' }, // orange
  { name: 'Job Offer',    color: '#4ade80' }, // green
];


const EmailModal = ({ jobTitle, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-16 px-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8">

      {/* Subject + Close */}
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 leading-snug pr-4">
          Subject: Application Received - {jobTitle}
        </h2>
        <button
          onClick={onClose}
          className="px-4 py-1.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shrink-0"
        >
          Close
        </button>
      </div>

      {/* Sender row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
          <img
            src="/hrprofile.png"
            alt="HR"
            className="w-full h-full object-cover"
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('flex','items-center','justify-center','bg-green-100','text-green-700','font-bold','text-sm');
              e.target.parentElement.textContent = 'HR';
            }}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Human Resource Department</p>
          <p className="text-xs text-gray-400">to me</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6" />

      {/* Email body */}
      <div className="text-sm text-gray-700 leading-relaxed space-y-4">
        <p>Dear Eng Mengeang,</p>
        <p>
          Thank you for submitting your application for the <strong>{jobTitle}</strong> position at [Company Name].
        </p>
        <p>
          We confirm that we have received your application and our recruitment team will review it carefully.
          If your qualifications match our requirements, we will contact you regarding the next steps in the
          recruitment process.
        </p>
        <p>
          We appreciate your interest in [Company Name] and thank you for considering us as a potential employer.
        </p>
        <div className="pt-2">
          <p>Kind regards,</p>
          <p>Khean Sievlinh</p>
          <p>Human Resources Department</p>
          <p>[Company Name]</p>
        </div>
      </div>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const [emailModal, setEmailModal]     = useState(null); // jobTitle string or null

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('applications') || '[]');
    const filtered = stored.filter(app => app.jobTitle === 'Backend Developer');
    localStorage.setItem('applications', JSON.stringify(filtered));
    setApplications(filtered);
  }, []);

  // find current stage index (default 0 = Application)
  const getStageIndex = (status) => {
    const idx = stages.findIndex(s => s.name.toLowerCase() === (status || '').toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Email modal overlay */}
      {emailModal && <EmailModal jobTitle={emailModal} onClose={() => setEmailModal(null)} />}

      <div className="max-w-7xl mx-auto">

        {/* Page title + green underline */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Application</h1>
          <div className="mt-2 h-0.5 w-full bg-green-500 rounded" />
        </div>

        {/* Empty state */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FaBriefcase className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-500 text-sm mb-6">You haven't applied for any jobs yet.</p>
            <Link to="/view-jobs" className="inline-block px-6 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {applications.map((app, index) => {
              const activeIdx = getStageIndex(app.status);
              return (
                <div key={index} className="bg-gray-100 rounded-xl p-6">

                  {/* Job title + stage */}
                  <h2 className="text-lg font-bold text-gray-900 mb-0.5">{app.jobTitle}</h2>
                  <p className="text-sm text-gray-500 mb-5">Stage: {app.status}</p>

                  {/* Progress bars */}
                  <div className="flex gap-3 mb-5">
                    {stages.map((stage, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        {/* Colored bar */}
                        <div
                          className="w-full h-1.5 rounded-full"
                          style={{
                            background: i <= activeIdx ? stage.color : '#d1d5db',
                            opacity: i <= activeIdx ? 1 : 0.5,
                          }}
                        />
                        {/* Label */}
                        <span className="text-xs text-gray-500 text-center leading-tight">{stage.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Email button */}
                  <button
                    onClick={() => setEmailModal(app.jobTitle)}
                    className="px-5 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Email
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplication;