// import React from "react";
// import { useNavigate } from "react-router-dom";
// import SideBar from "../components/SideBar";

// export default function JobList() {
//   const navigate = useNavigate();

//   const jobs = [
//     {
//       id: 1,
//       title: "Senior UI/UX Designer",
//       company: "Amazon",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
//       location: "Mumbai, India",
//       type: "Part-Time",
//       salary: "$120/hr",
//       posted: "5 days ago",
//       applications: 48 
//     },
//     {
//       id: 2,
//       title: "Graphic Designer",
//       company: "Google",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg",
//       location: "Kochi, India",
//       type: "Part-Time",
//       salary: "$150-220k",
//       posted: "30 days ago",
//       applications: 124
//     },
//     {
//       id: 3,
//       title: "Senior Motion Designer",
//       company: "Dribbble",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/Dribbble_logo.svg",
//       location: "Chennai, India",
//       type: "Contract",
//       salary: "$85/hr",
//       posted: "10 days ago",
//       applications: 12
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#FDFDFD]">
//       <SideBar />

//       <main className="flex-1 ml-[227px] p-8">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-800">Job Postings</h1>
//             <p className="text-slate-400 text-xs font-medium">You have {jobs.length} active listings</p>
//           </div>
//           {/* Create New Button Style */}
//           <button 
//             onClick={() => navigate("/post-job")}
//             className="px-8 py-3 bg-[#0F172A] text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-95"
//           >
//             Create New
//           </button>
//         </div>

//         {/* Filter Bar Section */}
//         <div className="flex justify-between items-center mb-10 gap-4">
//           <div className="relative flex-1 max-w-md">
//             <span className="absolute left-4 top-3 text-slate-400">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </span>
//             <input 
//               type="text" 
//               placeholder="Search job by name or role..." 
//               className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow-sm"
//             />
//           </div>

//           <div className="flex items-center gap-4">
//             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filter Status:</span>
//             <div className="relative">
//               <select className="appearance-none pl-6 pr-10 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none shadow-sm cursor-pointer">
//                 <option>All ({jobs.length})</option>
//                 <option>Active</option>
//                 <option>Paused</option>
//               </select>
//               <span className="absolute right-4 top-4 text-slate-400 pointer-events-none">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* List Header Labels */}
//         <div className="grid grid-cols-12 gap-4 px-6 mb-3">
//           <div className="col-span-5 text-[10px] font-black uppercase tracking-widest text-slate-300">Role & Company</div>
//           <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-300">Applications</div>
//           <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-300">Salary</div>
//           <div className="col-span-3 text-[10px] font-black uppercase tracking-widest text-slate-300 text-right">Actions</div>
//         </div>

//         {/* Compact List Items */}
//         <div className="space-y-3">
//           {jobs.map((job) => (
//             <div 
//               key={job.id} 
//               onClick={() => navigate(`/job-detail/${job.id}`)}
//               className="group grid grid-cols-12 gap-4 items-center bg-white border border-slate-50 rounded-[24px] p-5 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
//             >
//               <div className="col-span-5 flex items-center gap-4">
//                 <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-xl p-2.5 border border-slate-100 group-hover:bg-white transition-colors">
//                   <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
//                 </div>
//                 <div>
//                   <h3 className="text-[15px] font-bold text-slate-800 group-hover:text-green-600 transition-colors leading-tight">
//                     {job.title}
//                   </h3>
//                   <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{job.company} • {job.location}</p>
//                 </div>
//               </div>

//               <div className="col-span-2">
//                 <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
//                   {job.applications} Applied
//                 </span>
//               </div>

//               <div className="col-span-2 text-sm font-black text-slate-700">
//                 {job.salary}
//               </div>

//               <div className="col-span-3 flex justify-end gap-3" onClick={(e) => e.stopPropagation()}>
//                 <button 
//                   onClick={() => navigate(`/job-detail/${job.id}`)}
//                   className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 rounded-xl transition-all border border-slate-100"
//                 >
//                   Manage
//                 </button>
//                 <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
//                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiChevronDown, FiSearch, FiX } from 'react-icons/fi';
import jobsData from '../data/jobsData';
import { SideBar } from '../components/SideBar';

const JobPostings = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(jobsData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  // Get unique departments and job types
  const departments = useMemo(() => {
    const depts = [...new Set(jobs.map(job => job.department))];
    return ['All', ...depts];
  }, [jobs]);

  const jobTypes = useMemo(() => {
    const types = [...new Set(jobs.map(job => job.jobType))];
    return ['All', ...types];
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    // Apply department filter
    if (departmentFilter !== 'All') {
      filtered = filtered.filter(job => job.department === departmentFilter);
    }

    // Apply job type filter
    if (jobTypeFilter !== 'All') {
      filtered = filtered.filter(job => job.jobType === jobTypeFilter);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'applicants-desc':
        filtered.sort((a, b) => b.applicants - a.applicants);
        break;
      case 'applicants-asc':
        filtered.sort((a, b) => a.applicants - b.applicants);
        break;
      default:
        break;
    }

    return filtered;
  }, [jobs, statusFilter, departmentFilter, jobTypeFilter, searchQuery, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter('All');
    setDepartmentFilter('All');
    setJobTypeFilter('All');
    setSearchQuery('');
    setSortBy('date-desc');
  };

  // Check if any filters are active
  const hasActiveFilters = statusFilter !== 'All' || departmentFilter !== 'All' || 
                          jobTypeFilter !== 'All' || searchQuery !== '';

  // Handle View - Navigate to job details page
  const handleView = (jobId) => {
    console.log('Viewing job:', jobId);
    navigate(`/job-details/${jobId}`);
  };

  // Handle Edit - Navigate to edit job page
  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  // Handle Delete - Show confirmation modal
  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(jobs.filter(job => job.id !== jobToDelete.id));
      console.log('Deleted job:', jobToDelete.title);
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  // Cancel Delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  // Handle Post New Position
  const handlePostNewPosition = () => {
    console.log('Creating new position');
    navigate('/create-new-job');
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gray-50">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto p-6 mr-20">
        <SideBar />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Job Postings</h1>
            <button
              onClick={handlePostNewPosition}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-sm"
            >
              Post New Position
            </button>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, department, or location..."
              className="w-full px-6 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX className="text-xl" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mb-4"
          >
            <FiFilter className="text-gray-600" />
            <span className="font-medium text-gray-700">
              {filterOpen ? 'Hide Filters' : 'Show Filters'}
            </span>
            <FiChevronDown className={`text-gray-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Filter Options */}
          {filterOpen && (
            <div className="border-t-2 border-gray-100 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white cursor-pointer"
                    >
                      <option>All</option>
                      <option>Active</option>
                      <option>Closed</option>
                      <option>Draft</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <div className="relative">
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="appearance-none w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white cursor-pointer"
                    >
                      {departments.map(dept => (
                        <option key={dept}>{dept}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                  <div className="relative">
                    <select
                      value={jobTypeFilter}
                      onChange={(e) => setJobTypeFilter(e.target.value)}
                      className="appearance-none w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white cursor-pointer"
                    >
                      {jobTypes.map(type => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white cursor-pointer"
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="title-asc">Title (A-Z)</option>
                      <option value="title-desc">Title (Z-A)</option>
                      <option value="applicants-desc">Most Applicants</option>
                      <option value="applicants-asc">Least Applicants</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-green-600 hover:text-green-700 font-semibold"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing <span className="text-gray-900 font-bold">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
            {hasActiveFilters && ' (filtered)'}
          </p>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-xl text-gray-500">No job postings found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Card Header - Illustration */}
                <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-purple-100 p-8 flex items-center justify-center h-48 relative">
                  {/* Cloud decorations */}
                  <div className="absolute top-4 left-8 w-16 h-10 bg-white/70 rounded-full"></div>
                  <div className="absolute top-6 right-12 w-12 h-8 bg-white/60 rounded-full"></div>
                  <div className="absolute bottom-8 left-12 w-14 h-9 bg-white/50 rounded-full"></div>
                  
                  {/* Sun */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-yellow-300 rounded-full shadow-lg"></div>
                  
                  {/* Laptop/Monitor Illustration */}
                  <div className="relative z-10">
                    {/* Monitor */}
                    <div className="w-40 h-24 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl border-4 border-gray-200 flex items-center justify-center overflow-hidden">
                      {/* Screen content */}
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 p-2">
                        {/* UI Elements */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-cyan-400 rounded shadow-md flex items-center justify-center text-white text-xs font-bold">
                          UI
                        </div>
                        <div className="absolute top-2 right-2 w-8 h-8 bg-purple-600 rounded shadow-md flex items-center justify-center text-white text-xs font-bold">
                          UX
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute bottom-2 left-2 w-4 h-4 bg-blue-300 rounded-full"></div>
                        <div className="absolute bottom-2 right-2 w-3 h-3 bg-pink-300 rounded-full"></div>
                      </div>
                    </div>
                    {/* Monitor Stand */}
                    <div className="w-20 h-2 bg-gray-300 mx-auto mt-1 rounded-full"></div>
                    <div className="w-32 h-1 bg-gray-400 mx-auto mt-0.5 rounded-full"></div>
                  </div>

                  {/* Character decoration */}
                  <div className="absolute bottom-4 left-6 text-4xl">🧑‍💻</div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      job.status === 'Active' 
                        ? 'bg-green-500 text-white' 
                        : job.status === 'Closed'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-xl mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{job.department} • {job.jobType}</p>
                  
                  <div className="space-y-1 mb-5">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{job.applicants}</span> applicant{job.applicants !== 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-gray-600">
                      Posted: <span className="font-semibold">{new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </p>
                    {job.location && (
                      <p className="text-sm text-gray-600">
                        📍 {job.location}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(job.id)}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(job.id)}
                      className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                    >
                      Edit 
                    </button>
                    <button
                      onClick={() => handleDeleteClick(job)}
                      className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
                  <span className="font-semibold text-gray-900">{jobToDelete?.title}</span>?
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

export default JobPostings;