import React from "react";
import { CogIcon } from "@heroicons/react/24/outline";

const Settings: React.FC = () => {
  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CogIcon className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              System Settings
            </h2>
            <p className="text-sm text-gray-500">
              Configure your application settings here.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-gray-700">
                General Settings
              </h3>
              <div className="mt-2">
                <label className="block text-sm text-gray-500">
                  Store Name
                </label>
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
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
