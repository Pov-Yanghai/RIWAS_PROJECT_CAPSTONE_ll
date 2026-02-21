import React, { useRef, useState } from "react";
import { FaCamera, FaPlus, FaTimes } from "react-icons/fa";

const ProfileCandidate = () => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "./userprofile.png"
  );

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Eng Mengeang",
    email: "mengeang@example.com",
    phone: "+855 987 654 321",
    role: "Candidate",
    bio:
      "Over the past 70 years as a member of the United Nations, Cambodia has actively contributed to the maintenance of international peace and security, promoted international cooperation under international law, advanced economic development, participated in interventions to resolve conflicts among member states, and helped prevent the outbreak of world wars."
  });

  const [attachments, setAttachments] = useState([
    { id: 1, name: "Eng_Mengeang_Resume.pdf", url: "/sample-resume.pdf" },
  ]);

  const [viewingAttachment, setViewingAttachment] = useState(null);

  // IMAGE
  const handleImageClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  // ATTACHMENTS
  const handleAddAttachment = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file, index) => ({
      id: attachments.length + index + 1,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setAttachments([...attachments, ...newAttachments]);
  };
  const handleDeleteAttachment = (id) =>
    setAttachments(attachments.filter((att) => att.id !== id));
  const handlePreviewAttachment = (att) => window.open(att.url, "_blank");
  const handleViewAttachment = (att) => {
    window.open(`/cvNoSidebar?attachment=${att.id}`, "_blank");
  };

  // EDIT / SAVE
  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleInputChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  // LOGOUT
  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <>
      {/* Google Fonts Roboto */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className="font-['Roboto']">
        {!viewingAttachment ? (
          <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-8 bg-gray-50">
              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
                <div
                  className="relative w-32 h-32 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full border-4 border-white"
                  />
                  <div className="absolute bottom-2 right-2 w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaCamera />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  hidden
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold">{profile.fullName}</h2>
                    <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
                      {profile.role}
                    </span>
                  </div>
                  <p className="text-gray-600">{profile.email}</p>
                  <p className="text-gray-400 text-sm">Created at 21 Nov 2025</p>
                </div>
              </div>

              <hr className="my-6 border-gray-300" />

              {/* PERSONAL INFORMATION */}
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-600 text-sm">FULL Name</label>
                  <input
                    name="fullName"
                    value={profile.fullName}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Email</label>
                  <input
                    name="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Phone Number</label>
                  <input
                    name="phone"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Role</label>
                  <input
                    name="role"
                    value={profile.role}
                    disabled
                    className="w-full mt-1 p-2 border rounded-md border-gray-300 bg-gray-100"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-gray-600 text-sm">Bio</label>
                <textarea
                  name="bio"
                  rows="4"
                  disabled={!isEditing}
                  value={profile.bio}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md border-gray-300"
                />
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleEditToggle}
                  className="bg-green-600 text-white px-6 py-2 rounded-md"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-green-600 text-white px-6 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>

              {/* ATTACHMENTS */}
              <div className="mt-10 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Attachment</h3>
                <label className="bg-gray-200 px-3 py-1 rounded-md cursor-pointer flex items-center gap-1">
                  <FaPlus /> New
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleAddAttachment}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                {attachments.map((att) => (
                  <div
                    key={att.id}
                    className="bg-white p-3 rounded-md border flex justify-between items-center"
                  >
                    <span>{att.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePreviewAttachment(att)}
                        className="bg-blue-100 border border-blue-500 px-3 py-1 rounded-md text-sm"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleViewAttachment(att)}
                        className="bg-white border border-gray-400 px-3 py-1 rounded-md text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteAttachment(att.id)}
                        className="bg-red-100 border border-red-500 text-red-500 px-3 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed top-0 left-0 w-full h-full bg-black/70 p-8 flex flex-col">
            <div className="flex justify-between items-center text-white mb-4">
              <h3>{viewingAttachment.name}</h3>
              <button onClick={() => setViewingAttachment(null)}>
                <FaTimes />
              </button>
            </div>
            <iframe
              src={viewingAttachment.url}
              className="w-full h-[600px] rounded-md border-0 bg-white"
              title="Preview"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCandidate;