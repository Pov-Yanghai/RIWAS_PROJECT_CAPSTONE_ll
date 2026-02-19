import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";

const matrixLegend = [
  { name: "Technical", color: "bg-blue-500" },
  { name: "Soft Skills", color: "bg-purple-500" },
  { name: "Behavioral", color: "bg-orange-500" },
  { name: "Values", color: "bg-pink-500" },
  { name: "Experience", color: "bg-gray-500" },
  { name: "Mindset", color: "bg-indigo-500" },
  { name: "Collaboration", color: "bg-green-500" },
];

const btnBase = "h-11 px-8 rounded-xl font-bold text-sm transition-all flex items-center justify-center active:scale-95";
const btnDark = `${btnBase} bg-slate-900 text-white hover:bg-slate-800 shadow-md w-auto px-6`;
const btnSecondary = `${btnBase} bg-white border border-slate-200 text-slate-700 hover:bg-slate-50`;

export default function MatrixPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("list"); 
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMatrix, setSelectedMatrix] = useState(null);
  
  const [currentMatrix, setCurrentMatrix] = useState({
    name: "",
    category: "Technical",
    criteria: [""]
  });

  const [matrices, setMatrices] = useState([
    { id: 1, name: "Technical Skill", category: "Technical", criteria: ["Coding", "Architecture", "Logic"] },
    { id: 2, name: "Communication Skill", category: "Soft Skills", criteria: ["Verbal", "Writing", "Clarity"] },
    { id: 3, name: "Problem Solving Skill", category: "Mindset", criteria: ["Analytical", "Speed", "Creativity"] },
  ]);

  // Logic to handle criteria choices
  const handleAddPoint = () => {
    setCurrentMatrix({ ...currentMatrix, criteria: [...currentMatrix.criteria, ""] });
  };

  const handleUpdatePoint = (index, val) => {
    const updated = [...currentMatrix.criteria];
    updated[index] = val;
    setCurrentMatrix({ ...currentMatrix, criteria: updated });
  };

  const handleRemovePoint = (index) => {
    setCurrentMatrix({ ...currentMatrix, criteria: currentMatrix.criteria.filter((_, i) => i !== index) });
  };

  const saveMatrix = () => {
    if (mode === "create") {
      setMatrices([...matrices, { ...currentMatrix, id: Date.now() }]);
    } else {
      setMatrices(matrices.map(m => m.id === currentMatrix.id ? currentMatrix : m));
    }
    setMode("list");
  };

  const confirmDelete = () => {
    setMatrices(matrices.filter((m) => !selectedIds.includes(m.id)));
    setSelectedIds([]);
    setIsDeleteModalOpen(false);
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <SideBar />

      <main className="flex-1 ml-[227px] p-8">
        <div className="flex justify-between items-center border-b border-green-500 pb-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Interview Matrix Scoring Template</h2>
          <button
            onClick={() => (mode === "list" ? navigate(-1) : setMode("list"))}
            className={btnSecondary}
          >
            Back
          </button>
        </div>

        <div className="flex gap-8">
          {/* LEFT SIDEBAR */}
          <div className="w-64 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold mb-4 text-sm uppercase text-gray-400">Criteria Types</h3>
            <div className="space-y-3">
              {matrixLegend.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">

            {/* LIST MODE */}
            {mode === "list" && (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all">
                      <input
                        type="checkbox"
                        className="accent-green-500"
                        onChange={(e) => setSelectedIds(e.target.checked ? matrices.map(m => m.id) : [])}
                        checked={selectedIds.length === matrices.length && matrices.length > 0}
                      />
                      <span className="text-sm font-bold text-gray-600">Select All</span>
                    </label>
                    {selectedIds.length > 0 && (
                      <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold border border-red-100 hover:bg-red-100 transition-all"
                      >
                        Delete Selected ({selectedIds.length})
                      </button>
                    )}
                  </div>
                  <button onClick={() => { setCurrentMatrix({name: "", category: "Technical", criteria: [""]}); setMode("create"); }} className={btnDark}>
                    Create matrix
                  </button>
                </div>

                <div className="space-y-4">
                  {matrices.map((item) => (
                    <div key={item.id} className={`flex items-center gap-4 border p-5 rounded-2xl transition-all ${selectedIds.includes(item.id) ? "border-green-500 bg-green-50/30" : "border-gray-100 hover:border-gray-200"}`}>
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-green-500 cursor-pointer"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-base">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.category} • {item.criteria.length} Sub-Criteria</p>
                      </div>

                      {/* ORIGINAL ICON BUTTONS */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setSelectedMatrix(item); setMode("view"); }}
                          className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        <button
                          onClick={() => { setCurrentMatrix(item); setMode("edit"); }}
                          className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          onClick={() => { setSelectedIds([item.id]); setIsDeleteModalOpen(true); }}
                          className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* VIEW MODE */}
            {mode === "view" && selectedMatrix && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedMatrix.name}</h3>
                  <button onClick={() => setMode("list")} className="text-green-600 font-bold hover:underline">Return to List</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedMatrix.criteria.map((c, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-green-500 border border-green-100">{idx + 1}</div>
                      <span className="text-lg font-bold text-gray-700">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CREATE/EDIT FORM */}
            {(mode === "create" || mode === "edit") && (
              <div className="max-w-xl">
                <h3 className="text-xl font-bold mb-6 text-gray-800">{mode === "create" ? "Add New Matrix Template" : "Update Matrix Details"}</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Matrix Title</label>
                    <input
                      value={currentMatrix.name}
                      onChange={(e) => setCurrentMatrix({...currentMatrix, name: e.target.value})}
                      className="w-full border p-4 rounded-2xl bg-gray-50 border-gray-100 outline-green-500 font-bold text-gray-700"
                      placeholder="e.g. Technical Assessment"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Category Type</label>
                    <select 
                      value={currentMatrix.category}
                      onChange={(e) => setCurrentMatrix({...currentMatrix, category: e.target.value})}
                      className="w-full border p-4 rounded-2xl bg-gray-50 border-gray-100 outline-green-500 font-bold text-gray-700"
                    >
                      {matrixLegend.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Scoring Points</label>
                    <div className="space-y-3">
                      {currentMatrix.criteria.map((point, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            value={point}
                            onChange={(e) => handleUpdatePoint(idx, e.target.value)}
                            className="flex-1 border p-4 rounded-2xl bg-gray-50 border-gray-100 outline-green-500 text-sm font-medium"
                            placeholder={`Point ${idx + 1}`}
                          />
                          {idx > 0 && <button onClick={() => handleRemovePoint(idx)} className="p-4 text-red-400 font-bold">×</button>}
                        </div>
                      ))}
                      <button onClick={handleAddPoint} className="w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 font-bold text-xs hover:border-green-300 hover:text-green-500">+ Add Choice Point</button>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setMode("list")} className={btnSecondary}>Cancel</button>
                    <button onClick={saveMatrix} className={btnDark}>Save Changes</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DELETE MODAL */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white p-10 rounded-[40px] w-full max-w-[420px] shadow-2xl text-center">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Delete Matrix?</h3>
              <p className="text-gray-500 mb-10 leading-relaxed">Confirm to remove selected template(s).</p>
              <div className="flex gap-4">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black hover:bg-red-600 shadow-xl">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}