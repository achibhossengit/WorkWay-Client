import MainLayout from "../pages/Layouts/MainLayout";
import { Route, Routes } from "react-router";
import NotFound from "../components/Utilities/NotFound";
import JobsPage from "../pages/Jobs/JobsPage";
import JobDetailsPage from "../pages/Jobs/JobDetailsPage";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../pages/Layouts/DashboardLayout";
import Dashboard from "../pages/DashBoard/Dashboard";
import Profile from "../pages/DashBoard/Profile";
import PrivateRoutes from "./PrivateRoutes";
import Activation from "../pages/SignUp/Activation";
import PasswordReset from "../pages/SignIn/PasswordReset";
import AboutUs from "../pages/About/AboutUs";
import RoleRoute from "./RoleRoute";
import Applications from "../pages/DashBoard/Applications";
import PostedJobs from "../pages/DashBoard/PostedJobs";
import PostedJobDetails from "../pages/DashBoard/PostedJobDetails";
import JobApplications from "../pages/DashBoard/JobApplications";
import ApplicationDetails from "../pages/DashBoard/ApplicationDetails";
import PostJob from "../pages/DashBoard/PostJob";
import Reviews from "../pages/DashBoard/Reviews";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="activate/:uid/:token" element={<Activation />} />
        <Route
          path="password/reset/confirm/:uid/:token"
          element={<PasswordReset />}
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoutes>
            <DashboardLayout />
          </PrivateRoutes>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="reviews" element={<Reviews />} />
        <Route
          path="posted-jobs"
          element={
            <RoleRoute roles={["Employer"]}>
              <PostedJobs />
            </RoleRoute>
          }
        />
        <Route
          path="posted-jobs/:jobId/applications/:applicationId"
          element={
            <RoleRoute roles={["Employer"]}>
              <ApplicationDetails />
            </RoleRoute>
          }
        />
        <Route
          path="posted-jobs/:jobId/applications"
          element={
            <RoleRoute roles={["Employer"]}>
              <JobApplications />
            </RoleRoute>
          }
        />
        <Route
          path="posted-jobs/:jobId"
          element={
            <RoleRoute roles={["Employer"]}>
              <PostedJobDetails />
            </RoleRoute>
          }
        />
        <Route
          path="post-job/:jobId"
          element={
            <RoleRoute roles={["Employer"]}>
              <PostJob />
            </RoleRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
