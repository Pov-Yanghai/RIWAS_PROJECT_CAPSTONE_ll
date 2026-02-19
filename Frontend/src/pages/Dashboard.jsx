// import React from "react";
// import SideBar from "../components/SideBar";

// export default function Dashboard() {
//   // Mock data for the cards
//   const stats = [
//     { label: "Total Job Postings", value: "12", trend: "+2 this month", color: "text-green-500" },
//     { label: "Total Applicants", value: "148", trend: "+15% vs last week", color: "text-blue-500" },
//     { label: "Pending Reviews", value: "24", trend: "High priority", color: "text-orange-500" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] flex font-sans text-slate-900">
//       <SideBar />

//       <main className="flex-1 ml-[227px] p-10">
//         {/* Header Section */}
//         <div className="flex justify-between items-center border-b border-green-500 pb-6 mb-10">
//           <div>
//             <h2 className="text-3xl font-black text-slate-900">Dashboard</h2>
//             <p className="text-slate-500 text-sm mt-1">Welcome back, Eng Mengeang. Here is what's happening today.</p>
//           </div>
//           <button className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all">
//             Download Report
//           </button>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">{stat.label}</p>
//               <h3 className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</h3>
//               <p className="text-xs font-bold text-slate-400 italic">{stat.trend}</p>
//             </div>
//           ))}
//         </div>

//         {/* Main Content Area */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Quick Actions Card */}
//           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
//             <h3 className="text-xl font-black text-slate-900 mb-6 border-l-4 border-green-500 pl-4">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-[24px] hover:bg-green-50 hover:text-green-600 transition-all group">
//                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:shadow-green-100">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
//                 </div>
//                 <span className="font-bold text-sm uppercase tracking-tighter">Post Job</span>
//               </button>
//               <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-[24px] hover:bg-blue-50 hover:text-blue-600 transition-all group">
//                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:shadow-blue-100">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
//                 </div>
//                 <span className="font-bold text-sm uppercase tracking-tighter">Applications</span>
//               </button>
//             </div>
//           </div>

//           {/* Hiring Status Card */}
//           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
//             <h3 className="text-xl font-black text-slate-900 mb-6 border-l-4 border-green-500 pl-4">Hiring Overview</h3>
//             <div className="space-y-4">
//               {[
//                 { stage: "Screening", count: 45, color: "bg-blue-500" },
//                 { stage: "Interviews", count: 12, color: "bg-purple-500" },
//                 { stage: "Offer Sent", count: 3, color: "bg-green-500" },
//               ].map((item, i) => (
//                 <div key={i}>
//                   <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
//                     <span className="text-slate-500">{item.stage}</span>
//                     <span className="text-slate-900">{item.count}</span>
//                   </div>
//                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                     <div className={`${item.color} h-full`} style={{ width: `${(item.count/60)*100}%` }}></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import SideBar from "../components/SideBar";

// import { FiUsers, FiFileText, FiBriefcase, FiTrendingUp, FiClock, FiTarget, FiFilter } from 'react-icons/fi';

// const DashboardPage = () => {
//   const [selectedMonth, setSelectedMonth] = useState('This Month');

//   // PAGE 3 - Top Statistics Cards
//   const topStats = [
//     { 
//       title: 'Total Candidates', 
//       value: '1247', 
//       change: '+8.2%', 
//       period: 'from last week',
//       color: 'from-blue-500 to-blue-600',
//       icon: FiUsers
//     },
//     { 
//       title: 'News Applications This Week', 
//       value: '84', 
//       change: '+12.5%', 
//       period: 'vs last week',
//       color: 'from-teal-400 to-teal-500',
//       icon: FiFileText
//     },
//     { 
//       title: 'Open Job Positions', 
//       value: '23', 
//       change: '+2%', 
//       period: 'new this month',
//       color: 'from-purple-500 to-purple-600',
//       icon: FiBriefcase
//     },
//     { 
//       title: 'Hires This Month', 
//       value: '24', 
//       change: '+15%', 
//       period: 'From last week',
//       color: 'from-indigo-400 to-indigo-500',
//       icon: FiTrendingUp
//     }
//   ];

//   // Applications by Stage (PAGE 3 - Left)
//   const applicationsByStage = [
//     { stage: 'Application', count: 842, color: 'bg-purple-500', dotColor: 'bg-purple-500' },
//     { stage: 'Screening', count: 524, color: 'bg-blue-500', dotColor: 'bg-blue-500' },
//     { stage: 'Interview', count: 312, color: 'bg-purple-600', dotColor: 'bg-purple-600' },
//     { stage: 'Assessment', count: 842, color: 'bg-pink-500', dotColor: 'bg-pink-500' },
//     { stage: 'References', count: 842, color: 'bg-orange-400', dotColor: 'bg-orange-400' },
//     { stage: 'Decision', count: 842, color: 'bg-green-500', dotColor: 'bg-green-500' }
//   ];

//   // Applications by Position (PAGE 3 - Right - Donut)
//   const positionData = [
//     { position: 'Software Engineer', count: 240, color: '#4F46E5' },
//     { position: 'Product Manager', count: 80, color: '#EC4899' },
//     { position: 'UX / UI Designer', count: 290, color: '#06B6D4' },
//     { position: 'Data Analyst', count: 180, color: '#14B8A6' },
//     { position: 'Mobile App developer', count: 122, color: '#D1D5DB' },
//     { position: 'Data Scientist', count: 335, color: '#F59E0B' }
//   ];

//   // PAGE 2 - Metrics Cards
//   const metricsCards = [
//     { title: 'Avg. Time to Hire', value: '32', unit: 'days', icon: FiClock, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
//     { title: 'Success Rate', value: '78%', unit: 'of offers accepted', icon: FiTarget, bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
//     { title: 'This Month', value: '24', unit: 'new hires', icon: FiTrendingUp, bgColor: 'bg-green-50', textColor: 'text-green-600' }
//   ];

//   // PAGE 2 - Monthly Hires Data
//   const monthlyHires = [
//     { month: 'Jan', hires: 52, light: 65 },
//     { month: 'Feb', hires: 61, light: 75 },
//     { month: 'Mar', hires: 71, light: 85 },
//     { month: 'Apr', hires: 56, light: 70 },
//     { month: 'May', hires: 45, light: 60 },
//     { month: 'Jun', hires: 56, light: 70 },
//     { month: 'Jul', hires: 64, light: 77 },
//     { month: 'Aug', hires: 75, light: 95 },
//     { month: 'Sep', hires: 67, light: 85 },
//     { month: 'Oct', hires: 57, light: 70 },
//     { month: 'Nov', hires: 51, light: 65 },
//     { month: 'Dec', hires: 72, light: 90 }
//   ];

//   // PAGE 2 - Recent Applications Table
//   const recentApplicationsTable = [
//     { name: 'Eng Mengeang', position: 'Data Scientist', stage: 'Applied', date: '12-12-2025', status: 'In progress', statusColor: 'bg-blue-100 text-blue-700' }
//   ];

//   // PAGE 1 - Recent Candidates
//   const recentCandidates = [
//     { name: 'Touch Sopheak', position: 'Mobile App Developer', stage: 'References', date: '12-12-2025', status: 'shortlisted', statusColor: 'bg-green-100 text-green-700' },
//     { name: 'Keo Veasna', position: 'AR/VR Developer', stage: 'Screening', date: '12-12-2025', status: 'In progress', statusColor: 'bg-blue-100 text-blue-700' },
//     { name: 'Sok Dara', position: 'Cloud Security', stage: 'Decision', date: '12-12-2025', status: 'shortlisted', statusColor: 'bg-green-100 text-green-700' }
//   ];

//   // PAGE 1 - Job Openings
//   const jobOpenings = [
//     { 
//       id:1,
//       title: 'Senior Software Engineer', 
//       department: 'Engineering', 
//       openings: 3, 
//       applications: 89, 
//       hired: 2, 
//       target: 120,
//       percentage: 74
//     },
//     { id:2,
//       title: 'Product Manager', 
//       department: 'Product', 
//       openings: 2, 
//       applications: 124, 
//       hired: 1, 
//       target: 150,
//       percentage: 83
//     },
//     { id:3,
//       title: 'UX Designer', 
//       department: 'Design', 
//       openings: 4, 
//       applications: 156, 
//       hired: 3, 
//       target: 180,
//       percentage: 87
//     }
//   ];

//   const maxStageCount = Math.max(...applicationsByStage.map(s => s.count));
//   const totalApps = positionData.reduce((sum, p) => sum + p.count, 0);

//   return (
//     <div className="min-h-screen font-sans text-slate-900 bg-gray-50 ">
//       <div className="max-w-7xl mx-auto p-6 mr-20 ">
//       <SideBar />
//         {/* Header */}
//         <h1 className="text-4xl font-bold mb-8">Management Dashboard</h1>

//         {/* ==================== PAGE 3 - TOP SECTION ==================== */}
        
//         {/* Four Stat Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {topStats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg p-6 text-white`}>
//                 <div className="flex items-center justify-between mb-4">
//                   <Icon className="text-3xl opacity-90" />
//                 </div>
//                 <h3 className="text-sm font-medium opacity-90 mb-2">{stat.title}</h3>
//                 <div className="flex items-end justify-between mb-3">
//                   <p className="text-5xl font-bold">{stat.value}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-bold bg-white/25 px-2 py-1 rounded">
//                     {stat.change}
//                   </span>
//                   <span className="text-xs opacity-90">{stat.period}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Two-Column Section: Applications by Stage & Position */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Left: Recent Applications by Stage */}
//           <div className="bg-white rounded-2xl shadow-sm p-8">
//             <h2 className="text-2xl font-bold mb-2">Recent Applications</h2>
//             <p className="text-gray-500 mb-6">Latest applications and their current status</p>
            
//             <div className="space-y-5">
//               {applicationsByStage.map((stage, index) => (
//                 <div key={index}>
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-3 h-3 rounded-full ${stage.dotColor}`}></div>
//                       <span className="font-medium text-gray-700">{stage.stage}</span>
//                     </div>
//                     <span className="font-bold text-gray-900">{stage.count}</span>
//                   </div>
//                   <div className="w-full bg-gray-100 rounded-full h-2.5">
//                     <div 
//                       className={`${stage.color} h-2.5 rounded-full transition-all duration-700`}
//                       style={{ width: `${(stage.count / maxStageCount) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: Applications by Position - Donut Chart */}
//           <div className="bg-white rounded-2xl shadow-sm p-8">
//             <h2 className="text-2xl font-bold mb-2">Applications by Position</h2>
//             <p className="text-gray-500 mb-6">Key metrics and hiring trends</p>
            
//             {/* SVG Donut Chart */}
//             <div className="flex items-center justify-center mb-8">
//               <div className="relative w-80 h-80">
//                 <svg viewBox="0 0 200 200" className="transform -rotate-90 w-full h-full">
//                   {positionData.map((item, index) => {
//                     const startPercentage = positionData.slice(0, index).reduce((sum, p) => sum + p.count, 0);
//                     const circumference = 2 * Math.PI * 70;
//                     const offset = (startPercentage / totalApps) * circumference;
//                     const length = (item.count / totalApps) * circumference;
                    
//                     return (
//                       <circle
//                         key={index}
//                         cx="100"
//                         cy="100"
//                         r="70"
//                         fill="none"
//                         stroke={item.color}
//                         strokeWidth="35"
//                         strokeDasharray={`${length} ${circumference}`}
//                         strokeDashoffset={-offset}
//                         className="transition-all duration-700 hover:opacity-80"
//                       />
//                     );
//                   })}
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <p className="text-4xl font-bold text-gray-900">{totalApps}</p>
//                     <p className="text-sm text-gray-500 mt-1">Total</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Legend */}
//             <div className="grid grid-cols-2 gap-3">
//               {positionData.map((item, index) => (
//                 <div key={index} className="flex justify-between items-center">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm text-gray-700">{item.position}</span>
//                   </div>
//                   <span className="font-bold text-gray-900">{item.count}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ==================== PAGE 2 - MIDDLE SECTION ==================== */}
        
//         {/* Three Metric Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {metricsCards.map((metric, index) => {
//             const Icon = metric.icon;
//             return (
//               <div key={index} className={`${metric.bgColor} rounded-2xl shadow-sm p-6 border-2 border-gray-100`}>
//                 <div className="flex items-center gap-3 mb-4">
//                   <Icon className={`text-2xl ${metric.textColor}`} />
//                   <h3 className="text-sm font-semibold text-gray-700">{metric.title}</h3>
//                 </div>
//                 <p className="text-5xl font-bold text-gray-900 mb-2">{metric.value}</p>
//                 <p className="text-sm text-gray-600">{metric.unit}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Hires by Month Bar Chart */}
//         <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold">Hires by Month</h2>
//             <select 
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium"
//             >
//               <option>This Month</option>
//               <option>Last Month</option>
//               <option>Last 3 Months</option>
//             </select>
//           </div>

//           {/* Bar Chart */}
//           <div className="relative h-80 px-8">
//             <div className="absolute inset-0 flex items-end justify-between gap-3 px-8">
//               {monthlyHires.map((data, index) => (
//                 <div key={index} className="flex-1 flex flex-col items-center group">
//                   <div className="w-full flex flex-col items-center relative" style={{ height: '280px' }}>
//                     {/* Light background bar */}
//                     <div 
//                       className="w-full bg-purple-100 rounded-t-xl absolute bottom-0 transition-all duration-300"
//                       style={{ height: `${(data.light / 100) * 100}%` }}
//                     ></div>
//                     {/* Actual data bar */}
//                     <div 
//                       className="w-full bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 rounded-t-xl absolute bottom-0 transition-all duration-500 group-hover:from-indigo-700 group-hover:via-indigo-600 group-hover:to-indigo-500 cursor-pointer"
//                       style={{ height: `${(data.hires / 100) * 100}%` }}
//                     ></div>
//                   </div>
//                   <p className={`text-sm mt-3 font-semibold ${data.month === 'Aug' ? 'text-gray-900' : 'text-gray-500'}`}>
//                     {data.month}
//                   </p>
//                 </div>
//               ))}
//             </div>
            
//             {/* Y-axis labels */}
//             <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-400 font-medium">
//               <span>100</span>
//               <span>80</span>
//               <span>60</span>
//               <span>40</span>
//               <span>20</span>
//             </div>
//           </div>
//         </div>

//         {/* Recent Applications Table */}
//         <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-2xl font-bold">Recent Applications</h2>
//               <p className="text-gray-500">Latest applications and their current status</p>
//             </div>
//             <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//               <FiFilter className="text-indigo-600" />
//               <span>Filter & Short</span>
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b-2 border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Photo</th>
//                   <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Candidate Name</th>
//                   <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Position Applied</th>
//                   <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Current Stage</th>
//                   <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Applied Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status Tag</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentApplicationsTable.map((candidate, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-5">
//                       <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white text-xl">
//                         🌅
//                       </div>
//                     </td>
//                     <td className="px-6 py-5 font-semibold text-gray-900">{candidate.name}</td>
//                     <td className="px-6 py-5 text-gray-500">{candidate.position}</td>
//                     <td className="px-6 py-5">
//                       <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
//                         {candidate.stage}
//                       </span>
//                     </td>
//                     <td className="px-6 py-5 text-gray-600">{candidate.date}</td>
//                     <td className="px-6 py-5">
//                       <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${candidate.statusColor}`}>
//                         {candidate.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ==================== PAGE 1 - BOTTOM SECTION ==================== */}
        
//         {/* Recent Candidates Cards */}
//         <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
//           <div className="space-y-4">
//             {recentCandidates.map((candidate, index) => (
//               <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
//                 <div className="flex items-center gap-5">
//                   <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
//                     🌅
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg text-gray-900">{candidate.name}</h3>
//                     <p className="text-gray-500">{candidate.position}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-5">
//                   <span className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">
//                     {candidate.stage}
//                   </span>
//                   <span className="text-gray-600 font-medium">{candidate.date}</span>
//                   <span className={`px-5 py-2 rounded-lg font-semibold ${candidate.statusColor}`}>
//                     {candidate.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Job Opening Section */}
//         <div className="bg-white rounded-2xl shadow-sm p-8">
//           <h2 className="text-2xl font-bold mb-2">Job Opening</h2>
//           <p className="text-gray-500 mb-8">Active positions and hiring progress</p>

//           <div className="space-y-6">
//             {jobOpenings.map((job, index) => (
//               <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200">
//                 <div className="flex justify-between items-start mb-5">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
//                       <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
//                         {job.openings} openings
//                       </span>
//                     </div>
//                     <p className="text-gray-600 font-medium">{job.department}</p>
//                   </div>
//                   <div className="flex items-center gap-8 text-sm">
//                     <div className="flex items-center gap-2">
//                       <FiUsers className="text-gray-400 text-lg" />
//                       <span className="font-semibold text-gray-700">{job.applications} applications</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-green-600">
//                       <FiBriefcase className="text-lg" />
//                       <span className="font-semibold">{job.hired} hired</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="relative">
//                   <div className="w-full bg-gray-200 rounded-full h-3.5">
//                     <div 
//                       className="bg-gradient-to-r from-blue-600 to-blue-500 h-3.5 rounded-full transition-all duration-700 shadow-sm"
//                       style={{ width: `${job.percentage}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2 font-medium">
//                     {job.applications} of {job.target} target applications ({job.percentage}%)
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


import React, { useState, useMemo } from 'react';
import { FiUsers, FiFileText, FiBriefcase, FiTrendingUp, FiClock, FiTarget, FiFilter, FiChevronDown } from 'react-icons/fi';
import jobsData from '../data/jobsData';
import candidatesData, { hiredCandidates } from '../data/candidatesData';
import { SideBar } from '../components/SideBar';

const DashboardPage = () => {
  const [timeFilter, setTimeFilter] = useState('This Year');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [tableFilter, setTableFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Get date ranges based on filter
  const getDateRange = (filter) => {
    const now = new Date();
    switch(filter) {
      case 'This Month':
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: now
        };
      case 'Last Month':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
          end: new Date(now.getFullYear(), now.getMonth(), 0)
        };
      case 'Last 3 Months':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 3, 1),
          end: now
        };
      case 'Last 6 Months':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 6, 1),
          end: now
        };
      case 'This Year':
        return {
          start: new Date(now.getFullYear(), 0, 1),
          end: now
        };
      default:
        return { start: new Date(0), end: now };
    }
  };

  // Calculate real statistics from data with time filtering
  const statistics = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
    // Total candidates
    const totalCandidates = candidatesData.length;
    const lastWeekTotal = candidatesData.filter(c => new Date(c.appliedDate) < oneWeekAgo).length;
    const totalChange = lastWeekTotal > 0 
      ? (((totalCandidates - lastWeekTotal) / lastWeekTotal) * 100).toFixed(1)
      : '0';

    // This week applications
    const thisWeekApplications = candidatesData.filter(c => new Date(c.appliedDate) >= oneWeekAgo).length;
    const lastWeekApplications = candidatesData.filter(c => {
      const date = new Date(c.appliedDate);
      return date >= twoWeeksAgo && date < oneWeekAgo;
    }).length;
    const weekChange = lastWeekApplications > 0
      ? (((thisWeekApplications - lastWeekApplications) / lastWeekApplications) * 100).toFixed(1)
      : thisWeekApplications > 0 ? '100' : '0';

    // Open positions
    const openPositions = jobsData.filter(j => j.status === 'Active').length;
    const positionChange = '+2'; // Can be calculated if historical data available

    // This month hires
    const thisMonthHires = hiredCandidates.filter(h => {
      const hiredDate = new Date(h.hiredDate);
      return hiredDate.getMonth() === now.getMonth() && hiredDate.getFullYear() === now.getFullYear();
    }).length;
    
    const lastMonthHires = hiredCandidates.filter(h => {
      const hiredDate = new Date(h.hiredDate);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return hiredDate.getMonth() === lastMonth.getMonth() && hiredDate.getFullYear() === lastMonth.getFullYear();
    }).length;
    
    const hiresChange = lastMonthHires > 0
      ? (((thisMonthHires - lastMonthHires) / lastMonthHires) * 100).toFixed(1)
      : thisMonthHires > 0 ? '100' : '0';

    // Calculate average time to hire (in days)
    const avgTimeToHire = hiredCandidates.length > 0
      ? Math.round(
          hiredCandidates.reduce((sum, h) => {
            const days = (new Date(h.hiredDate) - new Date(h.applicationDate)) / (1000 * 60 * 60 * 24);
            return sum + days;
          }, 0) / hiredCandidates.length
        )
      : 0;

    // Calculate success rate (offers accepted / total offers)
    const successRate = hiredCandidates.length > 0
      ? Math.round(
          (hiredCandidates.filter(h => h.offerAccepted).length / hiredCandidates.length) * 100
        )
      : 0;

    return {
      totalCandidates,
      totalChange: totalChange >= 0 ? `+${totalChange}%` : `${totalChange}%`,
      thisWeekApplications,
      weekChange: weekChange >= 0 ? `+${weekChange}%` : `${weekChange}%`,
      openPositions,
      positionChange,
      thisMonthHires,
      hiresChange: hiresChange >= 0 ? `+${hiresChange}%` : `${hiresChange}%`,
      avgTimeToHire,
      successRate
    };
  }, []);

  // Top Statistics Cards
  const topStats = [
    { 
      title: 'Total Candidates', 
      value: statistics.totalCandidates.toString(), 
      change: statistics.totalChange, 
      period: 'from last week',
      color: 'from-blue-500 to-blue-600',
      icon: FiUsers
    },
    { 
      title: 'New Applications This Week', 
      value: statistics.thisWeekApplications.toString(), 
      change: statistics.weekChange, 
      period: 'vs last week',
      color: 'from-teal-400 to-teal-500',
      icon: FiFileText
    },
    { 
      title: 'Open Job Positions', 
      value: statistics.openPositions.toString(), 
      change: statistics.positionChange, 
      period: 'active roles',
      color: 'from-purple-500 to-purple-600',
      icon: FiBriefcase
    },
    { 
      title: 'Hires This Month', 
      value: statistics.thisMonthHires.toString(), 
      change: statistics.hiresChange, 
      period: 'vs last month',
      color: 'from-indigo-400 to-indigo-500',
      icon: FiTrendingUp
    }
  ];

  // Calculate applications by stage from real data with stage filter
  const applicationsByStage = useMemo(() => {
    const stages = ['Application', 'Screening', 'Interview', 'Assessment', 'References', 'Decision', 'Job Offer'];
    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-orange-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500', 'bg-teal-500'];
    
    const filteredCandidates = stageFilter === 'All Stages' 
      ? candidatesData 
      : candidatesData.filter(c => c.stage === stageFilter);
    
    return stages.map((stage, idx) => ({
      stage,
      count: filteredCandidates.filter(c => c.stage === stage).length,
      color: colors[idx],
      dotColor: colors[idx]
    }));
  }, [stageFilter]);

  // Calculate applications by position from real data
  const positionData = useMemo(() => {
    const positions = {};
    const colors = ['#4F46E5', '#EC4899', '#06B6D4', '#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444', '#10B981'];
    
    candidatesData.forEach(c => {
      positions[c.position] = (positions[c.position] || 0) + 1;
    });

    return Object.entries(positions)
      .map(([position, count], idx) => ({
        position,
        count,
        color: colors[idx % colors.length]
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending
  }, []);

  // Metrics Cards
  const metricsCards = [
    { 
      title: 'Avg. Time to Hire', 
      value: statistics.avgTimeToHire.toString(), 
      unit: 'days', 
      icon: FiClock, 
      bgColor: 'bg-blue-50', 
      textColor: 'text-blue-600' 
    },
    { 
      title: 'Success Rate', 
      value: `${statistics.successRate}%`, 
      unit: 'of offers accepted', 
      icon: FiTarget, 
      bgColor: 'bg-purple-50', 
      textColor: 'text-purple-600' 
    },
    { 
      title: 'This Month', 
      value: statistics.thisMonthHires.toString(), 
      unit: 'new hires', 
      icon: FiTrendingUp, 
      bgColor: 'bg-green-50', 
      textColor: 'text-green-600' 
    }
  ];

  // Monthly hires data - DYNAMIC based on time filter
  const monthlyHires = useMemo(() => {
    const dateRange = getDateRange(timeFilter);
    const months = [];
    const now = new Date();
    
    if (timeFilter === 'This Month') {
      // Show daily data for current month
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const weeksInMonth = Math.ceil(daysInMonth / 7);
      
      for (let week = 0; week < weeksInMonth; week++) {
        const weekStart = week * 7 + 1;
        const weekEnd = Math.min((week + 1) * 7, daysInMonth);
        const weekHires = hiredCandidates.filter(h => {
          const hiredDate = new Date(h.hiredDate);
          return hiredDate.getMonth() === now.getMonth() &&
                 hiredDate.getFullYear() === now.getFullYear() &&
                 hiredDate.getDate() >= weekStart &&
                 hiredDate.getDate() <= weekEnd;
        }).length;
        
        months.push({
          month: `W${week + 1}`,
          hires: weekHires
        });
      }
    } else if (timeFilter === 'Last Month') {
      // Show weekly data for last month
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const daysInMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).getDate();
      const weeksInMonth = Math.ceil(daysInMonth / 7);
      
      for (let week = 0; week < weeksInMonth; week++) {
        const weekStart = week * 7 + 1;
        const weekEnd = Math.min((week + 1) * 7, daysInMonth);
        const weekHires = hiredCandidates.filter(h => {
          const hiredDate = new Date(h.hiredDate);
          return hiredDate.getMonth() === lastMonth.getMonth() &&
                 hiredDate.getFullYear() === lastMonth.getFullYear() &&
                 hiredDate.getDate() >= weekStart &&
                 hiredDate.getDate() <= weekEnd;
        }).length;
        
        months.push({
          month: `W${week + 1}`,
          hires: weekHires
        });
      }
    } else {
      // Show monthly data
      const monthsToShow = timeFilter === 'Last 3 Months' ? 3 : 
                          timeFilter === 'Last 6 Months' ? 6 : 12;
      
      for (let i = monthsToShow - 1; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthHires = hiredCandidates.filter(h => {
          const hiredDate = new Date(h.hiredDate);
          return hiredDate.getMonth() === monthDate.getMonth() &&
                 hiredDate.getFullYear() === monthDate.getFullYear();
        }).length;
        
        months.push({
          month: monthDate.toLocaleString('default', { month: 'short' }),
          hires: monthHires
        });
      }
    }
    
    return months;
  }, [timeFilter]);

  // Get recent candidates based on filter and sorting
  const recentCandidates = useMemo(() => {
    let filtered = [...candidatesData];
    
    // Apply table filter
    if (tableFilter !== 'All') {
      filtered = filtered.filter(c => c.stage === tableFilter);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'position-asc':
        filtered.sort((a, b) => a.position.localeCompare(b.position));
        break;
      case 'position-desc':
        filtered.sort((a, b) => b.position.localeCompare(a.position));
        break;
      default:
        break;
    }
    
    return filtered.slice(0, 10); // Show top 10
  }, [tableFilter, sortBy]);

  const maxStageCount = Math.max(...applicationsByStage.map(s => s.count), 1);
  const totalApps = positionData.reduce((sum, p) => sum + p.count, 0);
  const maxHires = Math.max(...monthlyHires.map(m => m.hires), 1);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-gray-50">
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto p-6 mr-20">
        <SideBar />
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8">Management Dashboard</h1>
        
        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg p-5 text-white`}>
                <div className="flex items-end justify-between mb-3">
                  <p className="text-5xl font-bold">{stat.value}</p>
                  <div className="flex items-center justify-end mb-2">
                    <Icon className="text-4xl opacity-90" />
                  </div>
                </div>
                <h3 className="text-sm font-medium opacity-90 justify-end mb-2">{stat.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold bg-white/25 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                  <span className="text-xs opacity-90">{stat.period}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Applications by Stage & Position */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Recent Applications by Stage */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Applications by Stage</h2>
                <p className="text-sm text-gray-500">Current pipeline status</p>
              </div>
              <div className="relative">
                <select 
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                >
                  <option>All Stages</option>
                  <option>Application</option>
                  <option>Screening</option>
                  <option>Interview</option>
                  <option>Assessment</option>
                  <option>References</option>
                  <option>Decision</option>
                  <option>Job Offer</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="space-y-4">
              {applicationsByStage.map((stage, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.dotColor}`}></div>
                      <span className="font-medium text-gray-700 text-sm">{stage.stage}</span>
                    </div>
                    <span className="font-bold text-gray-900">{stage.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`${stage.color} h-2 rounded-full transition-all duration-700`}
                      style={{ width: `${(stage.count / maxStageCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Applications by Position - Donut Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Applications by Position</h2>
              <p className="text-sm text-gray-500 mb-4">Distribution across roles</p>
            </div>
            
            {/* Compact Donut Chart */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-56 h-56">
                <svg viewBox="0 0 200 200" className="transform -rotate-90 w-full h-full">
                  {positionData.map((item, index) => {
                    const startPercentage = positionData.slice(0, index).reduce((sum, p) => sum + p.count, 0);
                    const circumference = 2 * Math.PI * 65;
                    const offset = (startPercentage / totalApps) * circumference;
                    const length = (item.count / totalApps) * circumference;
                    
                    return (
                      <circle
                        key={index}
                        cx="100"
                        cy="100"
                        r="65"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="30"
                        strokeDasharray={`${length} ${circumference}`}
                        strokeDashoffset={-offset}
                        className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{totalApps}</p>
                    <p className="text-xs text-gray-500 mt-1">Total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
              {positionData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.position}</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Chart + Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Hires by Month Chart (2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Hires Over Time</h2>
                <p className="text-sm text-gray-500">Track hiring progress</p>
              </div>
              <div className="relative">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium bg-white cursor-pointer"
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Compact Bar Chart */}
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2 px-4">
                {monthlyHires.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="w-full flex flex-col items-center relative h-48">
                      {/* Actual data bar */}
                      <div 
                        className="w-full bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 rounded-t-lg absolute bottom-0 transition-all duration-500 hover:from-indigo-700 hover:via-indigo-600 hover:to-indigo-500 cursor-pointer"
                        style={{ height: `${(data.hires / maxHires) * 100}%` }}
                        title={`${data.hires} hires`}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {data.hires} hire{data.hires !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs mt-2 font-semibold text-gray-500">
                      {data.month}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Y-axis */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 font-medium">
                <span>{maxHires}</span>
                <span>{Math.floor(maxHires * 0.75)}</span>
                <span>{Math.floor(maxHires * 0.5)}</span>
                <span>{Math.floor(maxHires * 0.25)}</span>
                <span>0</span>
              </div>
            </div>
          </div>

          {/* Right: Metrics Cards (1 column) */}
          <div className="flex flex-col gap-4">
            {metricsCards.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className={`${metric.bgColor} rounded-xl shadow-sm p-5 border-2 border-gray-100`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`text-xl ${metric.textColor}`} />
                    <h3 className="text-xs font-semibold text-gray-700">{metric.title}</h3>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-xs text-gray-600">{metric.unit}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recent Applications</h2>
              <p className="text-sm text-gray-500">
                Latest candidate submissions {tableFilter !== 'All' && `(${tableFilter} stage)`}
              </p>
            </div>
            <div className="flex gap-3">
              {/* Stage Filter */}
              <div className="relative">
                <select
                  value={tableFilter}
                  onChange={(e) => setTableFilter(e.target.value)}
                  className="appearance-none flex items-center gap-2 px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Stages</option>
                  <option value="Application">Application</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Assessment">Assessment</option>
                  <option value="References">References</option>
                  <option value="Decision">Decision</option>
                  <option value="Job Offer">Job Offer</option>
                </select>
                <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="position-asc">Position (A-Z)</option>
                  <option value="position-desc">Position (Z-A)</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Photo</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Candidate Name</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Position Applied</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Current Stage</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Applied Date</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCandidates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center">
                      <p className="text-gray-500 text-lg">No candidates found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                    </td>
                  </tr>
                ) : (
                  recentCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                      <td className="px-4 py-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                          {candidate.avatar}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.email}</p>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{candidate.position}</td>
                      <td className="px-4 py-4">
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                          {candidate.stage}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">
                        {new Date(candidate.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          candidate.status === 'shortlisted' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {recentCandidates.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Showing {recentCandidates.length} of {tableFilter === 'All' ? candidatesData.length : candidatesData.filter(c => c.stage === tableFilter).length} candidates
            </div>
          )}
        </div>

        {/* Job Openings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Active Job Openings</h2>
            <p className="text-sm text-gray-500 mb-6">Current hiring positions and progress</p>
          </div>

          {jobsData.filter(j => j.status === 'Active').length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No active job openings</p>
              <p className="text-gray-400 text-sm mt-1">Create new positions to start hiring</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobsData.filter(j => j.status === 'Active').map((job) => (
                <div key={job.id} className="p-5 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          {job.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{job.department}</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <FiUsers className="text-gray-400" />
                        <span className="font-semibold text-gray-700">{job.applicants} applications</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-blue-500 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((job.applicants / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      {job.applicants} applications received
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;