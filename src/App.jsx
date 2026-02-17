import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import { StoreContext } from './context/AppContext';

// Pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import UserProfile from './pages/UserProfile/UserProfile';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import UserProfileUpdate from './pages/UserProfileUpdate/UserProfileUpdate';
import RecruiterRegister from './pages/RecruiterRegister/RecruiterRegister';
import RecruiterLogin from './pages/RecruiterLogin/RecruiterLogin';
import AddJob from './pages/AddJob/AddJob';
import ViewApplications from './pages/ViewApplications/ViewApplications';
import ManageJobs from './pages/ManageJobs/ManageJobs';
import RecruiterDashboard from './pages/RecruiterDashboard/RecruiterDashboard';
import Profile from './pages/Profile/Profile';
import JobApply from './pages/JobApply/JobApply';
import Interim from './pages/Interim/Interim';
import Intermediator from './pages/Intermediator/Intermediator';
import Interimtwo from './pages/Interim2/Interimtwo';


// Protected Route Components
import UserProtectedRoute from './components/UserProtectedRoute/UserProtectedRoute';
import RecruiterProtectedRoute from './components/RecruiterProtectedRoute/RecruiterProtectedRoute';
import JobSeekers from './pages/JobSeekers/JobSeekers';
import Employers from './pages/Employers/Employers';
import RecruiterUpdate from './pages/RecruiterUpdate/RecruiterUpdate';
import RecruitersEmployers from './pages/RecruitersEmployers/RecruitersEmployers';
import UpdateJob from './pages/UpdateJob/UpdateJob';
import UsersApplications from './pages/UsersApplications/UsersApplications';

const App = () => {
  const { token, recruiterToken } = useContext(StoreContext);

  return (
    <div>
      <ToastContainer />
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/interim" element={<Interim />} />
        <Route path="/intermediator" element={<Intermediator />} />
        <Route path="/interimtwo" element={<Interimtwo />} />
        <Route path="/user-registration" element={<Register />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/apply-job/:id" element={<JobApply />} />
        <Route path="/recruiter-registration" element={<RecruiterRegister />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />

        {/* User Protected Routes */}
        <Route
          path="/user-profile"
          element={
            <UserProtectedRoute>
              <UserProfile />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user-update"
          element={
            <UserProtectedRoute>
              <UserProfileUpdate />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/job-seekers"
          element={
            <UserProtectedRoute>
              <JobSeekers />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/employers"
          element={
            <UserProtectedRoute>
              <Employers />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/users-applications"
          element={
            <UserProtectedRoute>
              <UsersApplications />
            </UserProtectedRoute>
          }
        />

        {/* Recruiter Protected Routes */}
        <Route
          path="/add-job"
          element={
            <RecruiterProtectedRoute>
              <AddJob />
            </RecruiterProtectedRoute>
          }
        />
        <Route
          path="/update-job/:id"
          element={
            <RecruiterProtectedRoute>
              <UpdateJob />
            </RecruiterProtectedRoute>
          }
        />
        <Route
          path="/view-applications"
          element={
            <RecruiterProtectedRoute>
              <ViewApplications />
            </RecruiterProtectedRoute>
          }
        />
        <Route
          path="/manage-jobs"
          element={
            <RecruiterProtectedRoute>
              <ManageJobs />
            </RecruiterProtectedRoute>
          }
        />
        <Route
          path="/recruiter-employers"
          element={
            <RecruiterProtectedRoute>
              <RecruitersEmployers />
            </RecruiterProtectedRoute>
          }
        />
        <Route
          path="/recruiter-dashboard"
          element={
            <RecruiterProtectedRoute>
              <RecruiterDashboard />
            </RecruiterProtectedRoute>
          }
        />
        <Route
          path="/recruiter-profile"
          element={
            <RecruiterProtectedRoute>
              <Profile />
            </RecruiterProtectedRoute>
          }
        />
        <Route
          path="/recruiter-update"
          element={
            <RecruiterProtectedRoute>
              <RecruiterUpdate />
            </RecruiterProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
