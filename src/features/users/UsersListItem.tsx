import React from "react";
import { useDeleteUserMutation, type UserDto } from "../../app/api/usersApi";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

interface UsersListItemProps {
  user: UserDto;
  onView: (user: UserDto) => void;
}

const UsersListItem: React.FC<UsersListItemProps> = ({ user, onView }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${user.firstName}" (${user.email})? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteUser(user.id).unwrap();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {user.firstName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.emailConfirmed
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {user.emailConfirmed ? "Verified" : "Unverified"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-1 flex-wrap">
          {user.roles.map((role) => (
            <span
              key={role}
              className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800"
            >
              {role}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex gap-2">
          <button
            onClick={() => onView(user)}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            title="View Details"
          >
            <EyeIcon className="h-4 w-4" />
            View
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 disabled:opacity-50"
            title="Delete User"
          >
            <TrashIcon className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UsersListItem;
