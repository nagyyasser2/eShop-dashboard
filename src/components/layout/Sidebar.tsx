import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  TagIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import type { User } from "../../types";

interface SidebarProps {
  isOpen: boolean;
  user: User | null;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, user, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingBagIcon,
      roles: ["admin", "manager", "user"],
      iconColor: "text-blue-600",
    },
    {
      name: "Products",
      path: "/products",
      icon: ShoppingBagIcon,
      roles: ["admin", "manager"],
      iconColor: "text-green-600",
    },

    {
      name: "Catalog",
      path: "/categories",
      icon: TagIcon,
      roles: ["admin", "manager"],
      iconColor: "text-teal-600",
    },
    {
      name: "Banners",
      path: "/banners",
      icon: FlagIcon,
      roles: ["admin", "manager"],
      iconColor: "text-yellow-600",
    },
    {
      name: "Users",
      path: "/users",
      icon: UsersIcon,
      roles: ["admin", "manager"],
      iconColor: "text-purple-600",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: CogIcon,
      roles: ["admin"],
      iconColor: "text-emerald-600",
    },
  ];

  const handleNavClick = () => {
    // Only close sidebar on mobile (when it's an overlay)
    if (window.innerWidth < 768 && toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:relative fixed inset-y-0 left-0 z-30 w-64 bg-opacity-50 backdrop-blur-sm transition-opacity duration-150 bg-white  ease-in-out  ${
        !isOpen ? "md:hidden opacity-100 pointer-events-auto" : ""
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 px-8 py-4 pt-6  text-emerald-700 ">
          <img src="/icon.svg" alt="Icon" width="30" />
          <Link
            to="/"
            className="text-xl font-bold tracking-wide text-gray-800 "
            onClick={handleNavClick}
          >
            ShopHub
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-3">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleNavClick}
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      location.pathname.startsWith(item.path)
                        ? "bg-gray-50 text-green-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        location.pathname.startsWith(item.path)
                          ? "text-green-600"
                          : item.iconColor
                      }`}
                    />
                    <span className="hover:underline font-semibold">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
