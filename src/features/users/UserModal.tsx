import React, { useState } from "react";
import {
  useAssignRolesMutation,
  useRemoveRoleMutation,
  type UserDto,
} from "../../app/api/usersApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface UserModalProps {
  user: UserDto;
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_ROLES = ["Admin", "User"];

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  const [assignRoles, { isLoading: isAssigning }] = useAssignRolesMutation();
  const [removeRole, { isLoading: isRemoving }] = useRemoveRoleMutation();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  if (!isOpen) return null;

  const availableRolesToAdd = AVAILABLE_ROLES.filter(
    (role) => !user.roles.includes(role)
  );

  const handleAssignRoles = async () => {
    if (selectedRoles.length === 0) return;

    try {
      await assignRoles({ id: user.id, roles: selectedRoles }).unwrap();
      setSelectedRoles([]);
      alert("Roles assigned successfully");
    } catch (error) {
      console.error("Failed to assign roles:", error);
      alert("Failed to assign roles. Please try again.");
    }
  };

  const handleRemoveRole = async (roleName: string) => {
    if (!confirm(`Are you sure you want to remove the "${roleName}" role?`)) {
      return;
    }

    try {
      await removeRole({ id: user.id, roleName }).unwrap();
    } catch (error) {
      console.error("Failed to remove role:", error);
      alert("Failed to remove role. Please try again.");
    }
  };

  const toggleRoleSelection = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm transition-opacity duration-150 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* User Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 text-sm text-gray-900">{user.firstName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <p className="mt-1 text-sm text-gray-500 font-mono">{user.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Status
              </label>
              <span
                className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.emailConfirmed
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {user.emailConfirmed ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          {/* Current Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Roles
            </label>
            <div className="flex flex-wrap gap-2">
              {user.roles.length > 0 ? (
                user.roles.map((role) => (
                  <div
                    key={role}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    <span className="text-sm font-medium">{role}</span>
                    <button
                      onClick={() => handleRemoveRole(role)}
                      disabled={isRemoving}
                      className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                      title="Remove role"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No roles assigned</p>
              )}
            </div>
          </div>

          {/* Assign New Roles */}
          {availableRolesToAdd.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign New Roles
              </label>
              <div className="space-y-2 mb-3">
                {availableRolesToAdd.map((role) => (
                  <label
                    key={role}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => toggleRoleSelection(role)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleAssignRoles}
                disabled={selectedRoles.length === 0 || isAssigning}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isAssigning ? "Assigning..." : "Assign Selected Roles"}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
