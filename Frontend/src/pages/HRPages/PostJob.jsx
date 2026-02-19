import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, MapPin, Briefcase, DollarSign, Calendar } from "lucide-react";
import SideBar from "../../components/SideBar";

export default function PostJob() {
  const navigate = useNavigate();

  // Reusing RIWAS Design Tokens from Job Detail
  const labelStyle = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1";
  const inputStyle = "w-full p-4 bg-[#F8FAFC] rounded-2xl text-slate-700 text-sm font-semibold shadow-inner border-none focus:ring-2 focus:ring-[#03EF62] outline-none transition-all placeholder:text-slate-300";
  const sectionHeader = "text-lg font-bold text-slate-800 mb-4 mt-10 first:mt-0";
  const btnBase = "h-11 px-8 rounded-xl font-bold text-sm transition-all flex items-center justify-center active:scale-95";
  const btnDark = `${btnBase} bg-slate-900 text-white hover:bg-slate-800 shadow-md w-auto px-6`;
  const btnSecondary = `${btnBase} bg-white border border-slate-200 text-slate-700 hover:bg-slate-50`;
  const btnSave = `${btnBase} bg-green-600 text-white hover:bg-green-700 shadow-md`;
  const inputDisplay = "h-11 flex items-center w-full px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-medium text-sm";
  const inputEdit = "h-11 flex items-center w-full px-4 bg-white border-2 border-blue-400 rounded-xl text-slate-900 font-medium text-sm focus:outline-none";


  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />

      <main className="flex-1 ml-[227px] p-12">
        {/* Balanced margins with max-width and mx-auto, matching Job Detail */}
        <div className="max-w-6xl mx-auto">

          {/* Header Actions */}
          <div className="flex justify-between items-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 text-sm font-bold hover:text-slate-600 transition-all"
            >
              <ArrowLeft size={18} /> Back to Postings
            </button>

            <button className="px-8 py-2.5 bg-slate-100 text-slate-500 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-all">
              Save
            </button>
          </div>
          {/* Job Title Input Section */}
          <div className="mb-12">
            <h2 className={sectionHeader}>Basic Information</h2>
            <label className={labelStyle}>Job Position</label>
            <input
              type="text"
              placeholder="e.g. Data Science Intern"
              className={`${inputStyle} text-3xl font-black py-4 placeholder:text-slate-200`}
            />
          </div>

          {/* Core Details Grid - Identical to Job Detail Grid */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <div>
              <label className={labelStyle}>Department</label>
              <input type="text" placeholder="e.g. IT Department" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Location</label>
              <input type="text" placeholder="e.g. Phnom Penh" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Job Type</label>
              <select className={`${inputStyle} appearance-none cursor-pointer`}>
                <option value="">Select Type</option>
                <option value="full-time">Full-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Salary Range</label>
              <input type="text" placeholder="e.g. 150$ - 250$" className={inputStyle} />
            </div>
          </div>

          {/* Full Width Content Blocks (Span 1) - Matching Job Detail View */}
          <div className="space-y-2">
            <section>
              <h2 className={sectionHeader}>Job Description</h2>
              <textarea
                rows={4}
                placeholder="Describe the role and the ideal candidate impact..."
                className={`${inputStyle} resize-none leading-relaxed font-medium bg-[#F8FAFC]`}
              />
            </section>

            <section>
              <h2 className={sectionHeader}>Requirements</h2>
              <textarea
                rows={3}
                placeholder="e.g. React/Vue, Node/Python, Problem Solving..."
                className={`${inputStyle} resize-none font-medium`}
              />
            </section>

            <section className="pb-12">
              <h2 className={sectionHeader}>Responsibilities</h2>
              <textarea
                rows={5}
                placeholder="List the key duties for this position..."
                className={`${inputStyle} resize-none font-medium leading-loose`}
              />
            </section>
          </div>

          {/* Final Publish Button */}
          <div className="flex justify-end pb-20 border-t border-slate-50 pt-10">
            <button className={btnDark}>
              Create
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}