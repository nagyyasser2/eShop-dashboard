import React from "react";
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
    <div className="flex-1 bg-zinc-50">
      <div className="bg-white mx-auto rounded-lg p-6 border border-gray-200">
        <div className="flex gap-4 items-center text-lg font-semibold text-gray-700 mb-4">
          <FlagIcon className="h-8 w-8 text-blue-600" />
          <div>
            <span>Banner Management</span>
            <p className="text-sm text-gray-500">
              View and manage banners here.
            </p>
          </div>
          <div className="ml-auto">
            <Link
              to="/banners/create"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              + Create Banner
            </Link>
          </div>
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
  );
};

export default Banners;
