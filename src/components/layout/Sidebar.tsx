import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import type { ApplicationUser } from "../../types/auth.types";
import logo from "../../assets/icon.svg";

interface SidebarProps {
  isOpen: boolean;
  user: ApplicationUser | null;
  toggleSidebar?: () => void;
}

const Sidebar = ({ toggleSidebar }: SidebarProps) => {
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
      name: "Orders",
      path: "/orders",
      icon: ShoppingBagIcon,
      roles: ["admin", "manager", "user"],
      iconColor: "text-blue-600",
    },
    {
      name: "Catalog",
      path: "/categories",
      icon: TagIcon,
      roles: ["admin", "manager"],
      iconColor: "text-teal-600",
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
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Sidebar Header */}
      <div className="flex items-center gap-0 px-8 py-4 pt-6">
        <img src={logo} alt="Icon" width={30} />
        <Link
          to="/"
          className="text-xl font-semibold px-2 py-2 tracking-wide text-slate-700 underline"
          onClick={handleNavClick}
        >
          Dashboard
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
  );
};

export default Sidebar;
