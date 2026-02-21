import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../../server/userResumeAPI";

const UploadCV = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validateAndSet = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    setSelectedFile(file);
  };

  const handleFileChange = (e) => validateAndSet(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    validateAndSet(e.dataTransfer.files[0]);
  };

  const handleContinue = async () => {
    if (!selectedFile) { alert("Please select a CV file"); return; }
    setUploading(true);
    try {
      await uploadResume(selectedFile);
      alert("CV uploaded successfully!");
      setSelectedFile(null);
      navigate("/cv");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to upload CV");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>

  
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 0 18px",
        borderBottom: "2px solid #22c55e",
      }}>
        <img src="./biglogo.png" alt="RIWAS Logo" style={{ height: 90, objectFit: "contain" }} />
      </div>

    
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 40,
        paddingLeft: 16,
        paddingRight: 16,
      }}>

        {/* Title */}
        <h1 style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 40,
        }}>
          Input Your Resume
        </h1>

        <div style={{ width: "100%", maxWidth: 420, marginBottom: 12 }}>
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: `2px dashed ${dragging ? "#22c55e" : selectedFile ? "#22c55e" : "#d1d5db"}`,
              borderRadius: 12,
              background: dragging ? "#f0fdf4" : selectedFile ? "#f0fdf4" : "#fafafa",
              padding: "36px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {/* Upload icon */}
            <div style={{
              width: 52, height: 52,
              borderRadius: "50%",
              background: selectedFile ? "#dcfce7" : "#f3f4f6",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 4,
            }}>
              {selectedFile ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>

            {selectedFile ? (
              <>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#16a34a" }}>
                  {selectedFile.name}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
                  {(selectedFile.size / 1024).toFixed(1)} KB · Click to change file
                </p>
              </>
            ) : (
              <>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#374151" }}>
                  Click to upload or drag & drop
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
                  PDF only · Max 5MB
                </p>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex",
          gap: 24,
          marginTop: 28,
          width: "100%",
          maxWidth: 420,
          justifyContent: "center",
        }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              flex: 1,
              padding: "13px 0",
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={uploading || !selectedFile}
            style={{
              flex: 1,
              padding: "13px 0",
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: uploading || !selectedFile ? "not-allowed" : "pointer",
              opacity: uploading || !selectedFile ? 0.6 : 1,
            }}
          >
            {uploading ? "Uploading..." : "Continue"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UploadCV;