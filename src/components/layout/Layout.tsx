import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ShowMenuIcon from "../ui/ShowMenuIcon";
import { useAppSelector } from "../../app/hooks";
import NotificationIcon from "../ui/NotificationIcon";
import UserProfile from "../ui/UserProfile";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user } = useAppSelector((state) => state.auth);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        // On mobile: close sidebar when switching to mobile if it's open
        if (sidebarOpen) {
          setSidebarOpen(false);
        }
      } else {
        // On desktop: always show sidebar by default when resizing to desktop
        // But don't force it open if user explicitly closed it
        // You can choose to always open it on desktop or keep user's preference
        // setSidebarOpen(true); // Uncomment this if you want sidebar to always open when switching to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} user={user} toggleSidebar={toggleSidebar} />

      {/* Overlay (mobile only) */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 backdrop-blur-md backdrop-brightness-125 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col overflow-hidden max-h-screen transition-all duration-300 ${
          !sidebarOpen && !isMobile ? "w-full" : ""
        }`}
      >
        <header className="flex items-center justify-between bg-white px-5 py-3 ">
          <div className="flex items-center gap-4">
            <ShowMenuIcon toggleSidebar={toggleSidebar} />
          </div>
          <div>
            {user && (
              <div className="flex items-center space-x-4">
                <NotificationIcon />
                <UserProfile user={user} />
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 w-full mx-auto py-4 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
