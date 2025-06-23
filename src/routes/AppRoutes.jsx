import MainLayout from "../pages/Layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router";
import NotFound from "../components/Utilities/NotFound";
import JobsPage from "../pages/Jobs/JobsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default AppRoutes;
