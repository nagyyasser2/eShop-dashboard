import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  TagIcon,
  TicketIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  FlagIcon,
  PercentBadgeIcon,
} from "@heroicons/react/24/outline";
import type { User } from "../../types";
import UserProfile from "../ui/UserProfile";

interface SidebarProps {
  isOpen: boolean;
  user: User | null;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, user, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Products",
      path: "/products",
      icon: ShoppingBagIcon,
      roles: ["admin", "manager"],
      iconColor: "text-green-600",
    },
    {
      name: "Categories",
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
      name: "Orders",
      path: "/orders",
      icon: ShoppingBagIcon,
      roles: ["admin", "manager", "user"],
      iconColor: "text-blue-600",
    },
    {
      name: "Payments",
      path: "/payments",
      icon: CreditCardIcon,
      roles: ["admin", "manager"],
      iconColor: "text-yellow-600",
    },
    {
      name: "Customers",
      path: "/customers",
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

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } fixed md:static inset-y-0 left-0 z-30 w-64 bg-zinc-50 shadow-lg transition-transform duration-200 ease-in-out shadow-md shadow-green-900/20`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 px-8 py-2 pt-5">
          <img src="/icon.svg" alt="Icon" width="30" />
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-gray-800 hover:underline"
            onClick={toggleSidebar}
          >
            eShop
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-3">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path} onClick={toggleSidebar}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      location.pathname.startsWith(item.path)
                        ? "bg-green-50 text-green-600"
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
                    <span className="hover:underline">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer */}
        {user && <UserProfile user={user} />}
      </div>
    </div>
  );
};

export default Sidebar;
