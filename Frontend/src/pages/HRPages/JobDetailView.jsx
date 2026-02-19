import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, Trash2, Calendar, MapPin, Briefcase, DollarSign, Clock, Check, X } from "lucide-react";
import SideBar from "../../components/SideBar";

export default function JobDetail() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // State for the job data to allow editing
  const [job, setJob] = useState({
    title: "Data Science Intern",
    department: "IT Department",
    type: "Internship",
    location: "CADT, Phnom Penh",
    salaryRange: "150$ - 250$",
    postedDate: "20/12/2025",
    deadline: "15/01/2026",
    description: "Assist with data cleaning, visualization, and models. You will work closely with our engineering team to transform raw data into actionable insights.",
    requirements: "React/Vue, Node/Python, Databases, Git",
    responsibilities: "Support data pipeline development\nCreate visualization dashboards\nCollaborate with senior developers"
  });

  // Balanced Styling
  const labelStyle = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1";
  const inputStyle = "w-full p-3 bg-[#F8FAFC] rounded-xl text-slate-700 text-sm font-semibold shadow-inner border-none focus:ring-2 focus:ring-emerald-400 outline-none transition-all flex items-center gap-2.5";
  const sectionHeader = "text-lg font-bold text-slate-800 mb-5 flex items-center gap-2";
    // Styles
  const btnBase = "h-11 px-8 rounded-xl font-bold text-sm transition-all flex items-center justify-center active:scale-95";
  const btnDark = `${btnBase} bg-slate-900 text-white hover:bg-slate-800 shadow-md w-auto px-6`;
  const btnSecondary = `${btnBase} bg-white border border-slate-200 text-slate-700 hover:bg-slate-50`;
  const btnSave = `${btnBase} bg-green-600 text-white hover:bg-green-700 shadow-md`;
  const inputDisplay = "h-11 flex items-center w-full px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-medium text-sm";
  const inputEdit = "h-11 flex items-center w-full px-4 bg-white border-2 border-blue-400 rounded-xl text-slate-900 font-medium text-sm focus:outline-none";


  const handleSave = () => {
    setIsEditing(false);
    // Add logic here to update your backend
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />

      {/* mx-auto and max-w-6xl ensures equal left and right margins */}
      <main className="flex-1 ml-[227px] p-12">
        <div className="max-w-6xl mx-auto">

          {/* Header Actions */}
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 text-sm font-bold hover:text-slate-600 transition-all"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button onClick={() => setIsEditing(false)} className={btnSecondary}>
                    Cancel
                  </button>
                  <button onClick={handleSave} className={btnSave}>
                    Save Changes
                  </button>

                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-2 bg-[#0F172A] text-white rounded-xl text-sm font-bold hover:opacity-90">
                    Edit
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 bg-rose-50 text-rose-500 rounded-xl text-sm font-bold hover:bg-rose-500 hover:text-white">
                    <Trash2 size={16} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Title Area */}
          <div className="mb-12">
            <label className={labelStyle}>Job Title</label>
            {isEditing ? (
              <input
                className={`${inputStyle} text-2xl font-black py-4`}
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
              />
            ) : (
              <h1 className="text-4xl font-black text-slate-900">{job.title}</h1>
            )}
          </div>

          {/* Quick Info Grid - Equal Spacing */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <div>
              <label className={labelStyle}>Department</label>
              <input disabled={!isEditing} className={inputStyle} value={job.department} onChange={(e) => setJob({ ...job, department: e.target.value })} />
            </div>
            <div>
              <label className={labelStyle}>Location</label>
              <input disabled={!isEditing} className={inputStyle} value={job.location} onChange={(e) => setJob({ ...job, location: e.target.value })} />
            </div>
            <div>
              <label className={labelStyle}>Job Type</label>
              <input disabled={!isEditing} className={inputStyle} value={job.type} onChange={(e) => setJob({ ...job, type: e.target.value })} />
            </div>
            <div>
              <label className={labelStyle}>Salary Range</label>
              <input disabled={!isEditing} className={inputStyle} value={job.salaryRange} onChange={(e) => setJob({ ...job, salaryRange: e.target.value })} />
            </div>
          </div>

          {/* Description & Requirements - Symmetrical Layout */}
          <div className="grid grid-cols-1 gap-12">
            <section>
              <h2 className={sectionHeader}>Description</h2>
              {isEditing ? (
                <textarea
                  rows="8"
                  className={`${inputStyle} font-medium leading-relaxed`}
                  value={job.description}
                  onChange={(e) => setJob({ ...job, description: e.target.value })}
                />
              ) : (
                <p className="text-sm leading-relaxed font-medium bg-[#F8FAFC] p-6 shadow-inner">
                  {job.description}
                </p>
              )}
            </section>

            <section className="space-y-8">
              <div>
                <h2 className={sectionHeader}>Requirements</h2>
                <textarea
                  disabled={!isEditing}
                  rows="3"
                  className={inputStyle}
                  value={job.requirements}
                  onChange={(e) => setJob({ ...job, requirements: e.target.value })}
                  placeholder="Comma separated: React, Node, etc."
                />
              </div>
            </section>
            <section className="space-y-8">
              <div>
                <h2 className={sectionHeader}>Responsibilities</h2>
                <textarea
                  disabled={!isEditing}
                  rows="4"
                  className={inputStyle}
                  value={job.responsibilities}
                  onChange={(e) => setJob({ ...job, responsibilities: e.target.value })}
                />
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}