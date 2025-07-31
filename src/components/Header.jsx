import {
  Bell,
  Dot,
  Search,
  Sidebar,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
// import { useContext } from "react";
import SidebarContext from "../contexts/SidebarContext";
import CurrentPage from "../contexts/CurrentPageContext.jsx";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext.jsx";

function Header() {
  const { user } = useAuth();
  const { open, setOpen } = useContext(SidebarContext);
  const { page } = useContext(CurrentPage);
  const { notify, setNotify } = useContext(NotificationContext);

  const handleSidebar = () => {
    if (window.innerWidth < 1280) {
      notify && !open ? setNotify(false) : null;
      open ? setOpen(false) : setOpen(true);
    } else {
      open ? setOpen(false) : setOpen(true);
    }
  }

  const handleNotification = () => {
    if (window.innerWidth < 1280) {
      open && !notify ? setOpen(false) : null;
      notify ? setNotify(false) : setNotify(true);
    } else {
      notify ? setNotify(false) : setNotify(true);
    }
  };

  return (
    <header className="p-6 border-b">
      <div className="flex items-center justify-between flex-wrap">
        {/* Page title area */}
        <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
          {open ? (
            <SidebarClose
              fill="black"
              color="#F8F8F8"
              strokeWidth={1.5}
              size={20}
              onClick={() => handleSidebar()}
            />
          ) : (
            <SidebarOpen
              fill="black"
              color="#F8F8F8"
              strokeWidth={1.5}
              size={20}
              onClick={() => handleSidebar()}
            />
          )}

          <div
            className={`flex items-center gap-2 lg:gap-4 xl:gap-6 text-xs text-contrast min-w-56 lg:min-w-64`}
          >
            <h2>Dashboard</h2>
            <span>/</span>
            <h2 className="text-xs text-brand_color2 font-bold">
              {page || "Home"}
            </h2>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div
            className={`hidden sm:flex items-center lg:gap-2 p-2 bg-neutral-200 border border-base_grey rounded-full focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent text-contrast`}
          >
            <Search strokeWidth={1} size={16} />
            <input
              type="text"
              placeholder="Search"
              className={`${
                open ? "w-64 md:w-36 xl:w-64" : "w-64"
              } text-xs text-brand_color2 transition-all duration-300 bg-transparent placeholder:text-xs border-0 focus:ring-0 focus:outline-none focus:border-0`}
            />
          </div>
        </div>

        {/* User profile */}
        <div className="flex gap-3 items-center">
          <div
            className={`flex sm:hidden items-center lg:gap-2 p-2 border border-base_grey rounded-full focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent text-contrast`}
          >
            <Search strokeWidth={1} size={16} />
          </div>

          {/* Notifications */}
          <div className="relative">
            <div
              onClick={() => handleNotification()}
              className="text-contrast hover:text-secondary relative"
            >
              <span className="sr-only">Notifications</span>
              <Bell size={20} />
            </div>
            <div className="w-2 h-2 rounded-full bg-warning absolute top-0 right-0"></div>
          </div>

          <div className="w-6 h-6 bg-button bg-opacity-80 rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <span className="hidden lg:block text-xs font-medium text-brand_color2">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
