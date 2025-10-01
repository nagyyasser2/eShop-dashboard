import React from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import UsersList from "./UsersList";

const Users: React.FC = () => {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="bg-white mx-auto rounded-lg p-6 border border-gray-200">
        <div className="flex gap-4 items-center text-lg font-semibold text-gray-700 mb-6">
          <UsersIcon className="h-8 w-8 text-blue-600" />
          <div>
            <span>User Management</span>
            <p className="text-sm text-gray-500 font-normal">
              View and manage user accounts, roles, and permissions.
            </p>
          </div>
        </div>
        <UsersList />
      </div>
    </div>
  );
};

export default Users;
