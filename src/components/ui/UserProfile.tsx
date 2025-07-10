import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import type { User } from "../../types";
import { useLogoutMutation } from "../../features/api/eshopApi";

interface UserProfileProps {
  user: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [logout, { isLoading }] = useLogoutMutation();

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
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 bg-white shadow-md rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={
              user.profilePictureUrl ||
              `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
            }
            alt={`${user.firstName} ${user.lastName}`}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`p-2 cursor-pointer outline-none text-gray-700 hover:text-red-600  focus:ring-red-500 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        title="Log out"
      >
        <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">Log out</span>
      </button>
    </div>
  );
};

export default UserProfile;
