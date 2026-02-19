import React, { useState } from "react";
import { Search, ChevronDown, Trash2, CheckCircle2, XCircle, FileText } from "lucide-react";
import SideBar from "../../components/SideBar";

export default function ManageApplication() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState([
    { id: 1, name: "John Doe", position: "Frontend Developer", dateApplied: "2026-01-25", status: "Application", cvUrl: "#" },
    { id: 2, name: "Jane Smith", position: "Backend Developer", dateApplied: "2026-01-24", status: "Screening", cvUrl: "#" },
    { id: 3, name: "Michael Lee", position: "UI/UX Designer", dateApplied: "2026-01-22", status: "Interview", cvUrl: "#" },
    { id: 4, name: "Sokha Mean", position: "Frontend Developer", dateApplied: "2026-01-20", status: "Application", cvUrl: "#" },
  ]);

  // Logic for the "Next" button progression
  const handleNextStep = (id) => {
    const stages = ["Application", "Screening", "Interview", "Assessment", "References", "Decision", "Job Offer"];
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const currentIndex = stages.indexOf(app.status);
        const nextStatus = stages[currentIndex + 1] || app.status;
        return { ...app, status: nextStatus };
      }
      return app;
    }));
  };

  const handleReject = (id) => {
    // Usually, you might set status to 'Rejected' or remove them
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const filteredApps = applications.filter((app) => {
    const matchesTab = filter === "All" || app.status === filter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans text-slate-900">
      <SideBar />

      <main className="flex-1 ml-[227px] p-10">
        <div className="flex justify-between items-center pb-6 mb-2">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Manage Applications</h2>
          </div>
        </div>

        {/* Action Bar (Search & Filter) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="Search candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-[#03EF62] transition-all outline-none shadow-sm placeholder:text-slate-300"
            />
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-300" />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filter Status:</label>
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-5 pr-12 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-[#03EF62] outline-none cursor-pointer min-w-[180px]"
              >
                <option value="All">All Stages</option>
                {["Application", "Screening", "Interview", "Assessment", "References", "Decision", "Job Offer"].map((tab) => (
                  <option key={tab} value={tab}>{tab}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">No</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Position</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Resume</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredApps.map((app, index) => (
                <tr key={app.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5 text-sm font-bold text-slate-300">{index + 1}</td>
                  <td className="px-8 py-5 font-bold text-slate-800 text-sm">{app.name}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-500 italic">{app.position}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {app.status}
                    </span>
                  </td>
                  
                  {/* CV LINK */}
                  <td className="px-8 py-5 text-center">
                    <a 
                      href={app.cvUrl} 
                      className="inline-flex items-center gap-1.5 text-blue-500 font-bold text-xs underline decoration-blue-200 underline-offset-4 hover:decoration-blue-500 transition-all"
                    >
                      View CV
                    </a>
                  </td>

                  {/* ACTION BUTTONS: NEXT & REJECT */}
                  <td className="px-8 py-5">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleNextStep(app.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] font-black tracking-tight hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      >
                        Next
                      </button>
                      <button 
                        onClick={() => handleReject(app.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 rounded-xl text-[11px] font-black tracking-tight hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                       Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApps.length === 0 && (
            <div className="py-24 text-center bg-white text-slate-300 font-black uppercase tracking-[0.2em] text-sm">
              No Pipeline Results
            </div>
          )}
        </div>
      </main>
    </div>
  );
}