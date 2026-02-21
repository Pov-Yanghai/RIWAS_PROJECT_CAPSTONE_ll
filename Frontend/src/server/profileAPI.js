import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default {
  getProfile: () => API.get("/profile"),
  updateProfile: (data) => API.put("/profile", data),
  getAttachments: () => API.get("/profile/attachments"),
  uploadAttachment: (formData) =>
    API.post("/profile/attachments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteAttachment: (id) => API.delete(`/profile/attachments/${id}`),
};

//pong fix
