import React, { useState, useRef, useEffect } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useLogoutMutation } from "../../app/api/eshopApi";
import type { ApplicationUser } from "../../types/auth.types";

interface UserProfileProps {
  user: ApplicationUser | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await logout().unwrap();
        localStorage.removeItem("token");
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Failed to log out. Please try again.");
      }
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
      >
        <img
          className="h-10 w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all duration-200"
          src={
            user.ProfilePictureUrl ||
            `https://ui-avatars.com/api/?name=${user.FirstName}+${user.LastName}&background=random`
          }
          alt={`${user.FirstName} ${user.LastName}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    user.ProfilePictureUrl ||
                    `https://ui-avatars.com/api/?name=${user.FirstName}+${user.LastName}&background=random`
                  }
                  alt={`${user.FirstName} ${user.LastName}`}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user.FirstName} {user.LastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.Roles}</p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <ArrowRightOnRectangleIcon
                className="h-4 w-4 mr-3"
                aria-hidden="true"
              />
              {isLoading ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
