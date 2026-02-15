import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobPosting";
import ManageApplication from "./pages/ManageApplication";
import CandidateInfo from "./pages/CandidateInfo";
import RecruitmentWorkflow from "./pages/RecruitmentWorkflow";
import PostJob from "./pages/PostJob";
import MatrixPage from "./pages/MatrixPage";
import EditProfile from "./pages/EditPage";
import JobDetailView from "./pages/JobDetailView";
import InputResume from "./pages/InputResume"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        
        {/* Auth Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/inputresume" element={<InputResume />} />
        <Route path="/login" element={<Login />} />
        
        {/* User & Settings Routes */}
        <Route path="/profile-page" element={<ProfilePage />} />
        
        {/* Core Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job-listing" element={<JobList />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/manage-application" element={<ManageApplication />} />
        <Route path="/candidate-information" element={<CandidateInfo />} />
        
        {/* Configuration Routes - Exact match for ProfilePage links */}
        <Route path="/recruitment-workflow" element={<RecruitmentWorkflow />} />
        <Route path="/matrix-page" element={<MatrixPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/job-detail/:id" element={<JobDetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;