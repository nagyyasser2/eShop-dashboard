import type { ApplicationUser } from "../../types/auth.types";

interface OrderUserPopupProps {
  user?: ApplicationUser;
  isOpen: boolean;
  toggleOrderUserPopup?: () => void;
}

export default function OrderUserPopup({
  user,
  isOpen,
  toggleOrderUserPopup,
}: OrderUserPopupProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm transition-opacity duration-150 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={toggleOrderUserPopup}
      role="dialog"
      aria-labelledby="user-details-title"
      aria-modal="true"
    >
      <div
        className={`relative bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
          onClick={toggleOrderUserPopup}
          aria-label="Close user details"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="space-y-6">
          <h2
            id="user-details-title"
            className="text-2xl font-semibold text-gray-900 tracking-tight"
          >
            User Details
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">User ID:</span>{" "}
              {user?.id || "Not available"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Email:</span>{" "}
              {user?.email || "Not available"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">First Name:</span>{" "}
              {user?.firstName || "Not available"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Last Name:</span>{" "}
              {user?.lastName || "Not available"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Address:</span>{" "}
              {user?.address || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
