import React from "react";

interface ShowMenuIconProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const ShowMenuIcon: React.FC<ShowMenuIconProps> = ({
  toggleSidebar,
  sidebarOpen,
}) => {
  if (sidebarOpen) return null; // Hide button when sidebar is open

  return (
    <button
      onClick={toggleSidebar}
      className="md:hidden block top-4 left-4 z-50 p-2 pl-6 rounded-md bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200"
      aria-label="Open sidebar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="gray"
        className="h-8 w-8"
      >
        <path
          fillRule="evenodd"
          d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ShowMenuIcon;
