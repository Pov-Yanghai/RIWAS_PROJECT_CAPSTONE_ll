import React, { useState, useEffect } from "react";
import { getMyResume, updateResume } from "../../server/userResumeAPI";

// Load Roboto font
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
document.head.appendChild(fontLink);


const toArray = (v) => (Array.isArray(v) ? v : v && typeof v === "string" && v.trim() ? [v] : []);

const parseAIAnalysis = (ai_analysis) => {
  if (!ai_analysis) return null;
  let c = ai_analysis;
  if (typeof c === "object" && typeof c.raw === "string") c = c.raw;
  if (typeof c === "string") {
    try {
      c = JSON.parse(
        c.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim()
      );
    } catch { return null; }
  }
  return typeof c === "object" && c !== null ? c : null;
};

const transformAIToForm = (p) => {
  if (!p) return null;
  return {
    personalInformation: {
      fullName:    p.personalInformation?.fullName    || "",
      title:       p.personalInformation?.title       || "",
      email:       p.personalInformation?.email       || "",
      phone:       p.personalInformation?.phone       || "",
      dateOfBirth: p.personalInformation?.dateOfBirth || "",
      address:     p.personalInformation?.address     || "",
    },
    summary: p.professionalSummary || "",
    education:      toArray(p.education).map(e  => ({ degree: e?.degree || "", school: e?.school || "", year: e?.year || "" })),
    experience:     toArray(p.experience).map(e => ({ position: e?.position || "", company: e?.company || "", startDate: e?.startDate || "", endDate: e?.endDate || "", description: e?.description || "" })),
    projects:       toArray(p.projects).map(pr => typeof pr === "string" ? { name: pr, description: "" } : { name: pr?.name || "", description: pr?.description || "" }),
    skills: {
      programming: toArray(p.skills?.programming).join(", "),
      frameworks:  toArray(p.skills?.frameworks).join(", "),
      tools:       toArray(p.skills?.tools).join(", "),
      softSkills:  toArray(p.skills?.softSkills).join(", "),
    },
    certifications:  toArray(p.certifications).map(c  => typeof c === "string" ? { name: c } : { name: c?.name || "" }),
    extracurricular: toArray(p.extracurricular).map(e  => typeof e === "string" ? { role: e, organization: "", year: "", description: "" } : { role: e?.role || "", organization: e?.organization || "", year: e?.year || "", description: e?.description || "" }),
    languages:       toArray(p.languages).map(l       => typeof l === "string" ? { name: l, level: "" } : { name: l?.name || l?.language || "", level: l?.level || "" }),
    achievements:    toArray(p.achievements).map(a    => typeof a === "string" ? { name: a } : { name: a?.name || "" }),
  };
};


const color = {
  green:       "#22c55e",
  greenLight:  "#f0fdf4",
  greenBorder: "#bbf7d0",
  border:      "#e5e7eb",
  bg:          "#f3f4f6",
  white:       "#fff",
  label:       "#6b7280",
  text:        "#111827",
  subtext:     "#374151",
  placeholder: "#9ca3af",
  red:         "#ef4444",
  redLight:    "#fef2f2",
};


const Lbl = ({ children }) => (
  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: color.label, marginBottom: 5, fontFamily: "inherit" }}>
    {children}
  </label>
);

const Field = ({ label, value, editing, onChange, textarea, rows = 3, fullWidth }) => {
  const base = {
    width: "100%", padding: "9px 13px", fontSize: 14, fontFamily: "inherit",
    color: color.text, borderRadius: 8, outline: "none", boxSizing: "border-box",
  };
  const readStyle = { ...base, background: color.white, border: `1.5px solid ${color.border}`, color: value ? color.text : color.placeholder, cursor: "default" };
  const editStyle = { ...base, background: color.white, border: `1.5px solid ${color.green}` };

  return (
    <div style={fullWidth ? { gridColumn: "1 / -1" } : {}}>
      {label && <Lbl>{label}</Lbl>}
      {textarea ? (
        editing
          ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} style={{ ...editStyle, resize: "vertical", lineHeight: 1.6 }} />
          : <div style={{ ...readStyle, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{value || <span style={{ color: color.placeholder }}>—</span>}</div>
      ) : (
        <input type="text" disabled={!editing} value={value} onChange={e => onChange(e.target.value)} style={editing ? editStyle : readStyle} />
      )}
    </div>
  );
};

const Card = ({ title, children }) => (
  <div style={{ background: color.white, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" }}>
    <div style={{ padding: "15px 24px", borderBottom: `1px solid ${color.border}` }}>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: color.green }}>{title}</h2>
    </div>
    <div style={{ padding: "22px 24px" }}>{children}</div>
  </div>
);

const Grid2 = ({ children, gap = "16px 28px" }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap }}>{children}</div>
);

const HR = () => <div style={{ borderTop: `1px dashed ${color.border}`, margin: "20px 0" }} />;
const Empty = ({ text }) => <p style={{ color: color.placeholder, fontStyle: "italic", fontSize: 13, margin: 0 }}>{text}</p>;

// Small icon buttons
const AddBtn = ({ onClick }) => (
  <button onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: 6,
    padding: "7px 14px", borderRadius: 7, border: `1.5px solid ${color.green}`,
    background: color.greenLight, color: color.green, fontWeight: 600, fontSize: 13,
    cursor: "pointer", fontFamily: "inherit", marginTop: 14,
  }}>
    <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add
  </button>
);

const RemoveBtn = ({ onClick }) => (
  <button onClick={onClick} style={{
    padding: "4px 10px", borderRadius: 6, border: `1px solid ${color.red}`,
    background: color.redLight, color: color.red, fontWeight: 600, fontSize: 12,
    cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
  }}>
    Remove
  </button>
);


const CVPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeId,  setResumeId]  = useState(null);
  const [loading,   setLoading]   = useState(true);

  const [formData, setFormData] = useState({
    personalInformation: { fullName: "", title: "", email: "", phone: "", dateOfBirth: "", address: "" },
    summary: "",
    education: [], experience: [], projects: [],
    skills: { programming: "", frameworks: "", tools: "", softSkills: "" },
    certifications: [], extracurricular: [], languages: [], achievements: [],
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res  = await getMyResume();
        const body = res?.data;
        const data = body?.data ?? body;
        if (!data) return;
        setResumeId(data.id);
        const mapped = transformAIToForm(parseAIAnalysis(data.ai_analysis));
        if (mapped) setFormData(mapped);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const setPI    = (k, v) => setFormData(p => ({ ...p, personalInformation: { ...p.personalInformation, [k]: v } }));
  const setSkill = (k, v) => setFormData(p => ({ ...p, skills: { ...p.skills, [k]: v } }));
  const setArr   = (sec, i, k, v) => setFormData(p => {
    const a = [...p[sec]]; a[i] = { ...a[i], [k]: v };
    return { ...p, [sec]: a };
  });
  const addItem  = (sec, blank) => setFormData(p => ({ ...p, [sec]: [...p[sec], blank] }));
  const removeItem = (sec, i)   => setFormData(p => ({ ...p, [sec]: p[sec].filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!resumeId) return;
    const split = (s) => s ? s.split(",").map(x => x.trim()).filter(Boolean) : [];
    try {
      await updateResume(resumeId, {
        ai_analysis: {
          personalInformation: { ...formData.personalInformation },
          professionalSummary: formData.summary,
          education:           formData.education,
          experience:          formData.experience,
          projects:            formData.projects,
          skills: {
            programming: split(formData.skills.programming),
            frameworks:  split(formData.skills.frameworks),
            tools:       split(formData.skills.tools),
            softSkills:  split(formData.skills.softSkills),
          },
          certifications:  formData.certifications.map(c => c.name),
          extracurricular: formData.extracurricular,
          languages:       formData.languages,
          achievements:    formData.achievements.map(a => a.name),
        },
      });
      setIsEditing(false);
      alert("Resume updated successfully!");
    } catch { alert("Failed to save."); }
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
      <p style={{ color: color.placeholder, fontSize: 15, fontFamily: "'Roboto', sans-serif" }}>Loading resume…</p>
    </div>
  );

  const pi = formData.personalInformation;
  const btnGreen = { padding: "9px 22px", borderRadius: 8, border: "none", background: color.green, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" };
  const btnGhost = { padding: "9px 22px", borderRadius: 8, border: `1.5px solid ${color.border}`, background: color.white, color: color.subtext, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" };

  return (
    <div style={{ padding: "28px 32px", background: color.bg, minHeight: "100vh", fontFamily: "'Roboto', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* PAGE HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: color.text }}>My Resume / CV</h1>
          <div style={{ display: "flex", gap: 10 }}>
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} style={btnGhost}>Cancel</button>
                <button onClick={handleSave} style={btnGreen}>Save Changes</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} style={btnGreen}>Edit Resume</button>
            )}
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <Card title="Personal Information">
          <Grid2>
            <Field label="Full name"     value={pi.fullName}    editing={isEditing} onChange={v => setPI("fullName", v)} />
            <Field label="Professional"  value={pi.title}       editing={isEditing} onChange={v => setPI("title", v)} />
            <Field label="Email"         value={pi.email}       editing={isEditing} onChange={v => setPI("email", v)} />
            <Field label="Phone Number"  value={pi.phone}       editing={isEditing} onChange={v => setPI("phone", v)} />
            <Field label="Date of Birth" value={pi.dateOfBirth} editing={isEditing} onChange={v => setPI("dateOfBirth", v)} />
            <Field label="Address"       value={pi.address}     editing={isEditing} onChange={v => setPI("address", v)} />
          </Grid2>
        </Card>

        {/* PROFESSIONAL SUMMARY */}
        <Card title="Professional Summary">
          <Field value={formData.summary} editing={isEditing} textarea rows={4}
            onChange={v => setFormData(p => ({ ...p, summary: v }))} />
        </Card>

        {/* EDUCATION */}
        <div style={{ background: color.white, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" }}>
          <div style={{ padding: "15px 24px", borderBottom: `1px solid ${color.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: color.green }}>Education</h2>
            <button onClick={() => addItem("education", { degree: "", school: "", year: "" })}
              style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: color.green, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              + Add Education
            </button>
          </div>
          <div style={{ padding: "18px 24px" }}>
            {formData.education.length === 0 && <Empty text="No education added yet." />}
            {formData.education.map((e, i) => (
              <div key={i}>
                {i > 0 && <HR />}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                  <RemoveBtn onClick={() => removeItem("education", i)} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "0 20px", marginBottom: 14 }}>
                  <Field label="Degree" value={e.degree} editing={isEditing} onChange={v => setArr("education", i, "degree", v)} />
                  <Field label="Year"   value={e.year}   editing={isEditing} onChange={v => setArr("education", i, "year", v)} />
                </div>
                <Field label="School / Institution" value={e.school} editing={isEditing} onChange={v => setArr("education", i, "school", v)} />
              </div>
            ))}

            {/* Achievements nested inside Education */}
            {formData.achievements.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <Lbl>Achievements</Lbl>
                <div style={{ background: color.greenLight, border: `1px solid ${color.greenBorder}`, borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {formData.achievements.map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: color.green, fontSize: 18, fontWeight: 900, flexShrink: 0 }}>•</span>
                      <input
                        type="text" disabled={!isEditing} value={a.name}
                        onChange={e => setArr("achievements", i, "name", e.target.value)}
                        style={{ flex: 1, padding: "8px 12px", fontSize: 14, border: `1.5px solid ${isEditing ? color.green : color.greenBorder}`, borderRadius: 7, outline: "none", fontFamily: "inherit", background: color.white, color: color.text }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div style={{ background: color.white, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" }}>
          <div style={{ padding: "15px 24px", borderBottom: `1px solid ${color.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: color.green }}>Experience</h2>
            <button onClick={() => addItem("experience", { position: "", company: "", startDate: "", endDate: "", description: "" })}
              style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: color.green, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              + Add Experience
            </button>
          </div>
          <div style={{ padding: "18px 24px" }}>
            {formData.experience.length === 0 && <Empty text="No experience added yet." />}
            {formData.experience.map((e, i) => (
              <div key={i}>
                {i > 0 && <HR />}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                  <RemoveBtn onClick={() => removeItem("experience", i)} />
                </div>
                <Grid2>
                  <Field label="Position"    value={e.position}    editing={isEditing} onChange={v => setArr("experience", i, "position", v)} />
                  <Field label="Company"     value={e.company}     editing={isEditing} onChange={v => setArr("experience", i, "company", v)} />
                  <Field label="Start Date"  value={e.startDate}   editing={isEditing} onChange={v => setArr("experience", i, "startDate", v)} />
                  <Field label="End Date"    value={e.endDate}     editing={isEditing} onChange={v => setArr("experience", i, "endDate", v)} />
                  <Field label="Description" value={e.description} editing={isEditing} textarea rows={3} onChange={v => setArr("experience", i, "description", v)} fullWidth />
                </Grid2>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div style={{ background: color.white, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" }}>
          <div style={{ padding: "15px 24px", borderBottom: `1px solid ${color.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: color.green }}>Projects</h2>
            <button onClick={() => addItem("projects", { name: "", description: "" })}
              style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: color.green, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              + Add Project
            </button>
          </div>
          <div style={{ padding: "18px 24px" }}>
            {formData.projects.length === 0 && <Empty text="No projects added yet." />}
            {formData.projects.map((p, i) => (
              <div key={i}>
                {i > 0 && <HR />}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                  <RemoveBtn onClick={() => removeItem("projects", i)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <Field label="Project Name" value={p.name}        editing={isEditing} onChange={v => setArr("projects", i, "name", v)} />
                  <Field label="Description"  value={p.description} editing={isEditing} textarea rows={2} onChange={v => setArr("projects", i, "description", v)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <Card title="Skills">
          <Grid2>
            <Field label="Programming" value={formData.skills.programming} editing={isEditing} onChange={v => setSkill("programming", v)} />
            <Field label="Frameworks"  value={formData.skills.frameworks}  editing={isEditing} onChange={v => setSkill("frameworks", v)} />
            <Field label="Tools"       value={formData.skills.tools}       editing={isEditing} onChange={v => setSkill("tools", v)} />
            <Field label="Soft Skills" value={formData.skills.softSkills}  editing={isEditing} onChange={v => setSkill("softSkills", v)} />
          </Grid2>
        </Card>

        {/* CERTIFICATIONS */}
        <div style={{ background: color.white, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" }}>
          {/* Header row: green title left, add button right */}
          <div style={{ padding: "15px 24px", borderBottom: `1px solid ${color.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: color.green, textTransform: "uppercase", letterSpacing: "0.05em" }}>Certifications</h2>
            <button
              onClick={() => addItem("certifications", { name: "" })}
              style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: color.green, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              + Add CERTIFICATIONS
            </button>
          </div>
          <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
            {formData.certifications.length === 0 && (
              <Empty text="No certifications added yet." />
            )}
            {formData.certifications.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="text" disabled={!isEditing} value={c.name}
                  onChange={e => setArr("certifications", i, "name", e.target.value)}
                  style={{
                    flex: 1, padding: "9px 13px", fontSize: 14, fontFamily: "inherit",
                    border: `1.5px solid ${color.border}`,
                    borderRadius: 8, outline: "none", background: isEditing ? color.white : "#f9fafb", color: color.text,
                  }}
                />
                <RemoveBtn onClick={() => removeItem("certifications", i)} />
              </div>
            ))}
          </div>
        </div>

        {/* EXTRACURRICULAR */}
        <div style={{ background: color.white, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" }}>
          {/* Header row: green title left, add button right */}
          <div style={{ padding: "15px 24px", borderBottom: `1px solid ${color.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: color.green, textTransform: "capitalize", letterSpacing: "0.01em" }}>Extracurricular Activities</h2>
            <button
              onClick={() => addItem("extracurricular", { role: "", organization: "", year: "", description: "" })}
              style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: color.green, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              + Add Activity
            </button>
          </div>
          <div style={{ padding: "18px 24px" }}>
            {formData.extracurricular.length === 0 && (
              <Empty text="No extracurricular activities yet." />
            )}
            {formData.extracurricular.map((e, i) => (
              <div key={i}>
                {i > 0 && <HR />}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                  <RemoveBtn onClick={() => removeItem("extracurricular", i)} />
                </div>
                <Grid2>
                  <Field label="Role"         value={e.role}         editing={isEditing} onChange={v => setArr("extracurricular", i, "role", v)} />
                  <Field label="Organization" value={e.organization} editing={isEditing} onChange={v => setArr("extracurricular", i, "organization", v)} />
                  <Field label="Year"         value={e.year}         editing={isEditing} onChange={v => setArr("extracurricular", i, "year", v)} />
                  <div />
                  <Field label="Description" value={e.description} editing={isEditing} textarea rows={2} onChange={v => setArr("extracurricular", i, "description", v)} fullWidth />
                </Grid2>
              </div>
            ))}
          </div>
        </div>

        {/* LANGUAGES */}
        <div style={{ background: color.white, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" }}>
          <div style={{ padding: "15px 24px", borderBottom: `1px solid ${color.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: color.green, textTransform: "capitalize" }}>Languages</h2>
            <button
              onClick={() => addItem("languages", { name: "", level: "" })}
              style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: color.green, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              + Add Language
            </button>
          </div>
          <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {formData.languages.length === 0 && (
              <Empty text="No languages added yet." />
            )}
            {formData.languages.map((l, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px", alignItems: "end" }}>
                {/* Language input */}
                <div>
                  <Lbl>Language</Lbl>
                  <input
                    type="text" disabled={!isEditing} value={l.name}
                    onChange={e => setArr("languages", i, "name", e.target.value)}
                    style={{ width: "100%", padding: "9px 13px", fontSize: 14, fontFamily: "inherit", border: `1.5px solid ${color.border}`, borderRadius: 8, outline: "none", background: "#f9fafb", color: color.text, boxSizing: "border-box" }}
                  />
                </div>
                {/* Level dropdown */}
                <div style={{ display: "flex", alignItems: "end", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <Lbl>Level</Lbl>
                    <div style={{ position: "relative" }}>
                      <select
                        disabled={!isEditing}
                        value={l.level}
                        onChange={e => setArr("languages", i, "level", e.target.value)}
                        style={{
                          width: "100%", padding: "9px 36px 9px 13px", fontSize: 14, fontFamily: "inherit",
                          border: `1.5px solid ${color.border}`, borderRadius: 8, outline: "none",
                          background: "#f9fafb", color: l.level ? color.text : color.placeholder,
                          appearance: "none", cursor: isEditing ? "pointer" : "default",
                        }}>
                        <option value="">Select level</option>
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Beginner">Beginner</option>
                      </select>
                      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: color.label, fontSize: 12 }}>▼</span>
                    </div>
                  </div>
                  <RemoveBtn onClick={() => removeItem("languages", i)} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CVPage;