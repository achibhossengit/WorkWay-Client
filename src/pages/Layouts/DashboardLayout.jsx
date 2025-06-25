import { Outlet } from "react-router";

import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Sidebar from "../../components/Footer/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex relative min-h-[90vh] bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        className={`md:hidden absolute h-10 w-14 flex items-center justify-center rounded-r-lg bg-gray-200 ${
          sidebarOpen ? "-translate-x-full" : "translate-x-0"
        } transform transition-transform duration-400 ease-in-out z-50 px-1 text-blue-500 text-2xl`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
      </button>

      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transform transition-transform duration-400 ease-in-out
        absolute md:static w-64 min-h-full bg-white z-40`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        onClick={() => setSidebarOpen(false)}
        className="flex-1 overflow-auto p-6"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
