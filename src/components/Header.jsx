import {
  Bell,
  ChevronDown,
  Dot,
  Search,
  Menu,
  SidebarOpen,
  SidebarClose,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import SidebarContext from "../contexts/SidebarContext";
import CurrentPage from "../contexts/CurrentPageContext.jsx";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext.jsx";

function Header() {
  const { user } = useAuth();
  const { open, setOpen } = useContext(SidebarContext);
  const { page } = useContext(CurrentPage);
  const { notify, setNotify } = useContext(NotificationContext);

  // Prevent sidebar and notification section from displaying at once on smaller screens
  const handleSidebar = () => {
    if (window.innerWidth < 1280) {
      notify && !open ? setNotify(false) : null;
      open ? setOpen(false) : setOpen(true);
    } else {
      open ? setOpen(false) : setOpen(true);
    }
  };

  const handleNotification = () => {
    if (window.innerWidth < 1280) {
      open && !notify ? setOpen(false) : null;
      notify ? setNotify(false) : setNotify(true);
    } else {
      notify ? setNotify(false) : setNotify(true);
    }
  };

  return (
    <header className="px-2 md:px-6 h-16 md:h-20 border-b flex items-center justify-between flex-wrap">
      {/* Page title area */}
      <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
        {/* Hamburger menu for small screens */}
        <div className="block lg:hidden">
          {!open && (
            <Menu
              color="#2D7A51"
              size={32}
              strokeWidth={2}
              className="cursor-pointer"
              onClick={handleSidebar}
            />
          )}
          {/* Do not show X here; X should be inside Sidebar on small screens */}
        </div>
        {/* Sidebar toggle for large screens */}
        <div className="hidden lg:block ">
          {open ? (
            <SidebarClose
              fill="#2D7A51"
              color="#F8F8F8"
              strokeWidth={1.5}
              size={40}
              onClick={handleSidebar}
              className="cursor-pointer"
            />
          ) : (
            <SidebarOpen
              fill="#2D7A51"
              color="#F8F8F8"
              strokeWidth={1.5}
              size={40}
              onClick={handleSidebar}
              className="cursor-pointer"
            />
          )}
        </div>

        <div
          className={`flex items-center gap-2 lg:gap-4 xl:gap-6 text-xs text-contrast sm:min-w-56 lg:min-w-64`}
        >
          <h2 className="hidden md:block">Dashboard</h2>
          <span>/</span>
          <h2 className="text-xs text-brand_color2 font-bold">{page}</h2>
        </div>
      </div>

      {/* Header actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div
          className={`hidden items-center gap-2 px-3 py-2 bg-neutral-200 border border-base_grey rounded-full focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent text-contrast ${
            open ? "lg:flex" : "sm:flex"
          }`}
        >
          <Search strokeWidth={1} size={16} />
          <input
            type="text"
            placeholder="Search"
            name="search"
            className={`${
              open ? "min-w-0 w-64 md:w-36 xl:w-64" : "min-w-0 w-64"
            } text-xs text-brand_color2 transition-all duration-300 bg-transparent placeholder:text-xs border-0 focus:ring-0 focus:outline-none focus:border-0`}
          />
        </div>
      </div>

      {/* User profile */}
      <div className="flex gap-3 items-center">
        <div
          className={`flex items-center lg:gap-2 p-2 border border-base_grey rounded-full focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent text-contrast ${
            open ? "lg:hidden" : "sm:hidden"
          }`}
        >
          <Search strokeWidth={1} size={16} />
        </div>

        {/* Notifications */}
        <div className={`relative ${page == "Home" ? "" : "invisible"} `}>
          <div
            onClick={() => handleNotification()}
            className="text-contrast hover:text-secondary relative"
          >
            <span className="sr-only">Notifications</span>
            <Bell size={20} />
          </div>
          <div className="w-2 h-2 rounded-full bg-warning absolute top-0 right-0"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-button bg-opacity-80 rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <span className="hidden lg:block text-xs font-medium text-brand_color2">
            {user?.name}
          </span>
          <ChevronDown size={14} className="text-contrast" />
        </div>
      </div>
    </header>
  );
}

export default Header;
