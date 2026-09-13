import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Sidebar from "../../components/Footer/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      <ToastContainer />
      <button
        type="button"
        className={`absolute z-50 flex h-10 w-14 items-center justify-center rounded-r-lg bg-gray-200 px-1 text-2xl text-blue-500 transition-transform duration-400 ease-in-out md:hidden ${
          sidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
      </button>

      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} absolute z-40 w-64 min-h-screen border-r border-gray-200 bg-white transition-transform duration-400 ease-in-out md:static md:translate-x-0`}
      >
        <Sidebar />
      </div>

      <div
        onClick={() => setSidebarOpen(false)}
        className="min-h-screen flex-1 overflow-auto p-6"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
