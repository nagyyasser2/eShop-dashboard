import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  XMarkIcon,
  TagIcon,
  TicketIcon,
  ShieldCheckIcon,
  CreditCardIcon,
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
      name: "Coupons",
      path: "/coupons",
      icon: TicketIcon,
      roles: ["admin", "manager"],
      iconColor: "text-orange-600",
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
      name: "Admins",
      path: "/admins",
      icon: ShieldCheckIcon,
      roles: ["admin", "manager"],
      iconColor: "text-red-600",
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
      } fixed md:static inset-y-0 left-0 z-30 w-64 bg-zinc-50 shadow-lg transition-transform duration-200 ease-in-out border-r-1 border-zinc-900 md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="relative flex items-center justify-between px-4 py-5 pt-10 gap-1">
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold underline"
            onClick={toggleSidebar}
          >
            eShop
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path} onClick={toggleSidebar}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      location.pathname === item.path
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        location.pathname === item.path
                          ? "text-indigo-600"
                          : item.iconColor
                      }`}
                    />
                    <span>{item.name}</span>
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
