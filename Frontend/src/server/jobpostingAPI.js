import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Job Postings ──────────────────────────────────────────────────────────────

// GET /api/jobpostings?page=1&limit=10&status=published&location=...&jobType=...
export const getAllJobs = (params = {}) =>
  API.get("/jobpostings", { params });

// GET /api/jobpostings/:id
export const getJobById = (id) =>
  API.get(`/jobpostings/${id}`);

// POST /api/jobpostings
export const createJob = (jobData) => {
  // If no image file, send as JSON to avoid FormData serialization issues
  if (!jobData.image) {
    const { image, ...rest } = jobData;
    return API.post("/jobpostings", rest);
  }
  const form = new FormData();
  Object.entries(jobData).forEach(([k, v]) => {
    if (k === "image" && v) { form.append("image", v); return; }
    if ((k === "salary" || k === "requirements") && typeof v === "object") {
      form.append(k, JSON.stringify(v));
      return;
    }
    if (v !== undefined && v !== null && v !== "") form.append(k, v);
  });
  return API.post("/jobpostings", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// PUT /api/jobpostings/:id
export const updateJob = (id, jobData) => {
  // If no image file, send as JSON to avoid FormData serialization issues
  if (!jobData.image) {
    return API.put(`/jobpostings/${id}`, jobData);
  }
  const form = new FormData();
  Object.entries(jobData).forEach(([k, v]) => {
    if (k === "image" && v) { form.append("image", v); return; }
    if ((k === "salary" || k === "requirements") && typeof v === "object") {
      form.append(k, JSON.stringify(v));
      return;
    }
    if (v !== undefined && v !== null && v !== "") form.append(k, v);
  });
  return API.put(`/jobpostings/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// DELETE /api/jobpostings/:id
export const deleteJob = (id) =>
  API.delete(`/jobpostings/${id}`);

export default API;