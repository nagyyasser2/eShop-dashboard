import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FlagIcon } from "@heroicons/react/24/outline";
import {
  useCreateBannerMutation,
  BannerPosition,
} from "../../../app/api/bannersApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface BannerForm {
  title: string;
  description?: string;
  image?: FileList;
  linkUrl?: string;
  buttonText?: string;
  position: BannerPosition;
  sortOrder: number;
  startDate?: string;
  endDate?: string;
}

const CreateBannerPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BannerForm>({
    defaultValues: {
      title: "",
      description: "",
      sortOrder: 0,
      position: BannerPosition.HomepageTop,
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  const [createBanner, { isLoading, error }] = useCreateBannerMutation();
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (filePreview) URL.revokeObjectURL(filePreview);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<BannerForm> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);
      if (data.linkUrl) formData.append("linkUrl", data.linkUrl);
      if (data.buttonText) formData.append("buttonText", data.buttonText);
      formData.append("position", data.position);
      formData.append("sortOrder", data.sortOrder.toString());
      if (data.startDate) formData.append("startDate", data.startDate);
      if (data.endDate) formData.append("endDate", data.endDate);

      await createBanner(formData).unwrap();

      if (filePreview) URL.revokeObjectURL(filePreview);
      setFilePreview(null);
      reset();
      navigate("/banners");
    } catch (err: any) {
      console.error("Failed to create banner:", err);
      toast.error(
        error && "status" in error && error.status === 400
          ? (error.data as any)?.message ||
              "An error occurred while creating the banner"
          : "An unexpected error occurred"
      );
    }
  };

  const handleCancel = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(null);
    reset();
    navigate("/banners");
  };

  const errorMessage = error
    ? "status" in error
      ? (error.data as any)?.message ||
        "An error occurred while creating the banner"
      : "An unexpected error occurred"
    : null;

  return (
    <div className="flex-1 pl-6 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex items-center gap-3 mb-6">
          <FlagIcon className="h-8 w-8 text-yellow-600" />
          <h1 className="text-2xl font-bold text-gray-900">Create Banner</h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 200,
                    message: "Title cannot exceed 200 characters",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                })}
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.image.message}
                </p>
              )}
              {filePreview && (
                <div className="mt-4">
                  <img
                    src={filePreview}
                    alt="Banner Preview"
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link URL
              </label>
              <input
                id="linkUrl"
                type="text"
                {...register("linkUrl")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                id="buttonText"
                type="text"
                {...register("buttonText")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <select
                id="position"
                {...register("position", {
                  required: "Position is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {Object.values(BannerPosition).map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <input
                id="sortOrder"
                type="number"
                {...register("sortOrder", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Sort order must be positive" },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.sortOrder && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.sortOrder.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                {...register("endDate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  isLoading
                    ? "bg-yellow-400 cursor-not-allowed"
                    : "bg-yellow-600 hover:bg-yellow-700"
                } transition duration-200 cursor-pointer`}
              >
                {isLoading ? "Creating..." : "Create Banner"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBannerPage;
