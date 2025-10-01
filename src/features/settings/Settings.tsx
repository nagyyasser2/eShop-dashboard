import React from "react";
import { CogIcon } from "@heroicons/react/24/outline";

const Settings: React.FC = () => {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="bg-white mx-auto rounded-lg p-6 border border-gray-200">
        <div className="flex gap-4 items-center text-lg font-semibold text-gray-700 mb-4">
          <CogIcon className="h-8 w-8 text-blue-600" />
          <div>
            <span>System Settings</span>
            <p className="text-sm text-gray-500">
              Configure your application settings here.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-700">
              General Settings
            </h3>
            <div className="mt-2">
              <label className="block text-sm text-gray-500">Store Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="eShop Admin"
              />
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-700">
              Notification Preferences
            </h3>
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-500">
                  Email Notifications
                </span>
              </label>
            </div>
          </div>
          <div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 cursor-pointer">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
