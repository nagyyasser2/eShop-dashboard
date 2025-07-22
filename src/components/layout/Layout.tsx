import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ShowMenuIcon from "../ui/ShowMenuIcon";
import { useAppSelector } from "../../app/hooks";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Menu Toggle Icon */}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} user={user} toggleSidebar={toggleSidebar} />

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 backdrop-blur-md backdrop-brightness-125 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden max-h-screen">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-3">
          <ShowMenuIcon
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
          />
          <div className="max-w-8xl mx-auto mb-6 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
