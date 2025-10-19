import NotificationIcon from "../ui/NotificationIcon";
import ShowMenuIcon from "../ui/ShowMenuIcon";
import UserProfile from "../ui/UserProfile";

interface HeaderProps {
  toggleSidebar: () => void;
  User: any;
}

export default function Header({ toggleSidebar, User }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex justify-between bg-white px-5 py-3 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <ShowMenuIcon toggleSidebar={toggleSidebar} />
      </div>
      {User && (
        <div className="flex items-center space-x-4">
          <NotificationIcon />
          <UserProfile user={User} />
        </div>
      )}
    </header>
  );
}
