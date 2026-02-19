import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import JobPostings from "./pages/JobPosting";
import ManageApplication from "./pages/ManageApplication";
import CandidateInfo from "./pages/CandidateInfo";
import RecruitmentWorkflow from "./pages/RecruitmentWorkflow";
import PostJob from "./pages/PostJob";
import MatrixPage from "./pages/MatrixPage";
import EditProfile from "./pages/EditPage";
import JobDetailView from "./pages/JobDetailView";
import InputResume from "./pages/InputResume"
 
// Sana Candidate Pages import 
import Layout from "./components/Layout";
import LandingPage from "./pages/candidatePages/LandingPage";
import ProfileCandidatePage from "./pages/candidatePages/ProfileCandidatePage";
import CVPage from "./pages/candidatePages/CVPage";
import UploadCV from "./pages/candidatePages/UploadCV";
import ViewJobsPage from "./pages/candidatePages/ViewJobsPage";
import JobDetails from "./pages/candidatePages/JobDetails";
import ApplyJob from "./pages/candidatePages/ApplyJob";
import ApplicationPage from "./pages/candidatePages/ApplicationPage";
import Notifications from "./pages/candidatePages/Notifications";

import EditJob from "./pages/EditJob";
import CreateNewJob from "./pages/CreateNewJob";
import CVCandidate from "./pages/CVCandidate";
import SendNotification from "./pages/SentNotification";
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
        
        <Route path="/recruitment-workflow" element={<RecruitmentWorkflow />} />
        <Route path="/matrix-page" element={<MatrixPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/job-detail/:id" element={<JobDetailView />} />

         {/* Sana Candidate Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/uploadcv" element={<UploadCV />} />
        <Route path="/profile" element={<Layout><ProfileCandidatePage /></Layout>} />
        <Route path="/cv" element={<Layout><CVPage /></Layout>} />
        <Route path="/view-jobs" element={<Layout><ViewJobsPage /></Layout>} />
        <Route path="/job-details/:jobId" element={<Layout><JobDetails /></Layout>} />
        <Route path="/apply-job/:jobId" element={<Layout><ApplyJob /></Layout>} />
        <Route path="/application" element={<Layout><ApplicationPage /></Layout>} />
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
      
        
        {/* Core Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job-listing" element={<JobPostings />} />
        <Route path="/post-job" element={<PostJob />} />
      {/* Core Jobs Routes */}
        <Route path="/job-postings" element={<JobPostings />} />
        <Route path="/job-details/:jobId" element={<JobDetailView />} />
        <Route path="/edit-job/:jobId" element={<EditJob />} />
        <Route path="/create-new-job" element={<CreateNewJob />} />

        <Route path="/manage-application" element={<ManageApplication />} />
        {/* Core Candidate Info Routes */}
        <Route path="/candidate-information" element={<CandidateInfo />} />
        <Route path="/view-cv/:applicationId" element={<CVCandidate />} />
        <Route path="/send-notification/:candidateId" element={<SendNotification />} />
        <Route path="/send-offer/:candidateId" element={<SendNotification />} />
        
        {/* Configuration Routes - Exact match for ProfilePage links */}

       




      </Routes>
    </BrowserRouter>
  );
}

export default App;