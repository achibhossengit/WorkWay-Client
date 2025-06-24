import MainLayout from "../pages/Layouts/MainLayout";
import { Route, Routes } from "react-router";
import NotFound from "../components/Utilities/NotFound";
import JobsPage from "../pages/Jobs/JobsPage";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../pages/Layouts/DashboardLayout";
import Dashboard from "../pages/DashBoard/Dashboard";
import Profile from "../pages/DashBoard/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
