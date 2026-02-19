import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa'; // Added FaTimes for modal close
import SideBar from "../../components/SideBar"; 

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // --- NEW STATES FOR TEAM MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '' });

  const [profile, setProfile] = useState({
    fullName: 'Eng Mengeang',
    email: 'mengeangeng@gmail.com',
    phone: '+855 987 654 321',
    role: 'HR Manager',
    bio: 'Motivated Data Science student passionate about exploring new technologies.',
    processSteps: '7 Steps Process',
    matrixSteps: '5 Steps Matrix'
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@company.com', role: 'UI Designer', access: 'Admin' },
    { id: 2, name: 'Bob Johnson', email: 'bob@company.com', role: 'Developer', access: 'Member' }
  ]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  // Logic to add a member
  const handleAddMember = (e) => {
    e.preventDefault();
    const memberToAdd = {
      ...newMember,
      id: Date.now(), // Unique ID based on timestamp
      access: 'Member'
    };
    setTeamMembers([...teamMembers, memberToAdd]);
    setIsModalOpen(false); // Close modal
    setNewMember({ name: '', email: '', role: '' }); // Reset form
  };

  // Logic to delete a member
  const removeMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  // Styles
  const btnBase = "h-11 px-8 rounded-xl font-bold text-sm transition-all flex items-center justify-center active:scale-95";
  const btnDark = `${btnBase} bg-slate-900 text-white hover:bg-slate-800 shadow-md w-auto px-6`;
  const btnSecondary = `${btnBase} bg-white border border-slate-200 text-slate-700 hover:bg-slate-50`;
  const btnSave = `${btnBase} bg-green-600 text-white hover:bg-green-700 shadow-md`;
  const inputDisplay = "h-11 flex items-center w-full px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-medium text-sm";
  const inputEdit = "h-11 flex items-center w-full px-4 bg-white border-2 border-blue-400 rounded-xl text-slate-900 font-medium text-sm focus:outline-none";

  return (
    <div className="min-h-screen bg-white flex font-sans text-slate-900">
      <SideBar />
      <main className="flex-1 ml-[227px]">
        <div className="px-12 py-12 max-w-7xl mx-auto space-y-8">

          {/* SECTION 1: ACCOUNT DETAILS */}
          <section className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[28px] bg-slate-900 overflow-hidden border-4 border-slate-50 shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} alt="avatar" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{profile.fullName}</h1>
                  <p className="text-slate-400 text-sm mt-1">{profile.email} • {profile.role}</p>
                </div>
              </div>

              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className={btnSecondary}>Edit Profile</button>
              ) : (
                <div className="flex gap-3">
                  <button onClick={handleCancelEdit} className={btnSecondary}>Cancel</button>
                  <button onClick={handleSaveChanges} className={btnSave}>Save Changes</button>
                </div>
              )}
            </div>

            <h3 className="font-bold text-lg text-slate-800 mb-6">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                {isEditing ? (
                  <input name="fullName" value={tempProfile.fullName} onChange={handleInputChange} className={inputEdit} />
                ) : (
                  <div className={inputDisplay}>{profile.fullName}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                {isEditing ? (
                  <input name="email" value={tempProfile.email} onChange={handleInputChange} className={inputEdit} />
                ) : (
                  <div className={inputDisplay}>{profile.email}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                {isEditing ? (
                  <input name="phone" value={tempProfile.phone} onChange={handleInputChange} className={inputEdit} />
                ) : (
                  <div className={inputDisplay}>{profile.phone}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Role</label>
                <div className={inputDisplay}>{profile.role}</div>
              </div>
            </div>
          </section>

          {/* SECTION 2: SYSTEM CONFIGURATION */}
          <section className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-6">System Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recruitment Process</label>
                <div className="flex gap-4">
                  <div className="h-11 flex-1 px-4 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center font-semibold text-slate-700">{profile.processSteps}</div>
                  <button onClick={() => navigate("/recruitment-workflow")} className={btnDark}>Edit Process</button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scoring Matrix</label>
                <div className="flex gap-4">
                  <div className="h-11 flex-1 px-4 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center font-semibold text-slate-700">{profile.matrixSteps}</div>
                  <button onClick={() => navigate("/matrix-page")} className={btnDark}>Edit Matrix</button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: TEAM MANAGEMENT */}
          <section className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
            <div className="p-8 flex justify-between items-center border-b border-slate-50">
              <h3 className="font-bold text-lg text-slate-800">Team Management</h3>
              <button 
                onClick={() => setIsModalOpen(true)} 
                className={`${btnDark} flex items-center gap-2`}
              >
                <FaPlus className="text-[10px]"/> Invite Member
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-5">Collaborator</th>
                  <th className="px-6 py-5">Role</th>
                  <th className="px-10 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/30">
                    <td className="px-10 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">{member.name}</p>
                          <p className="text-[11px] text-slate-400">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">{member.role}</td>
                    <td className="px-10 py-5 text-right">
                      <button 
                        onClick={() => removeMember(member.id)}
                        className="text-red-300 hover:text-red-500 font-bold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* --- INVITE MEMBER MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-6">Invite New Member</h2>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <input 
                    required
                    className={inputEdit}
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input 
                    required
                    type="email"
                    className={inputEdit}
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Role</label>
                  <input 
                    required
                    className={inputEdit}
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-11 rounded-xl bg-slate-100 font-bold">Cancel</button>
                  <button type="submit" className="flex-1 h-11 rounded-xl bg-slate-900 text-white font-bold">Send Invite</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;