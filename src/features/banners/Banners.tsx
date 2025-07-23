import React, { useState } from "react";
import { FlagIcon } from "@heroicons/react/24/outline";
import {
  useGetBannersQuery,
  useDeleteBannerMutation,
  type BannerResponseDto,
} from "../../app/api/bannersApi";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from "../../utils/constants";

const Banners: React.FC = () => {
  const { data: banners, isLoading, error } = useGetBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteBanner(id).unwrap();
        toast.success("Banner deleted successfully");
      } catch (err) {
        console.error("Failed to delete banner:", err);
        toast.error("Failed to delete banner");
      }
    }
  };

  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FlagIcon className="h-8 w-8 text-yellow-600" />
            <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Banner Management
              </h2>
              <p className="text-sm text-gray-500">
                View and manage banners here.
              </p>
            </div>
            <Link
              to="/banners/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              + Create Banner
            </Link>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">
                Error loading banners
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {banners && banners.length > 0 ? (
                    banners.map((banner: BannerResponseDto) => (
                      <tr key={banner.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <Link
                            to={`/banners/${banner.id}/edit`}
                            className="hover:underline"
                          >
                            {banner.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {banner.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <img
                            src={`${SERVER_BASE_URL}${banner.imageUrl}`}
                            alt={banner.title}
                            className="h-12 w-12 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDelete(banner.id)}
                          >
                            <TrashIcon className="h-4 w-4 inline-block cursor-pointer" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No banners found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
