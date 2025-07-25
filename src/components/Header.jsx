import { Bell, Search, Sidebar, SidebarClose, SidebarOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
// import { useContext } from "react";
import SidebarContext from "../contexts/SidebarContext";
import CurrentPage from "../contexts/CurrentPageContext";
import { useContext } from "react";

function Header() {
  const { user } = useAuth();
  const { open, setOpen } = useContext(SidebarContext);
  const { page } = useContext(CurrentPage);

  return (
    <header className="p-6 border-b">
      <div className="flex items-center justify-between flex-wrap">
        {/* Page title area */}
        <div className="flex items-center gap-4 lg:gap-6">
          {open ? (
            <SidebarClose
              fill="black"
              color="#F8F8F8"
              strokeWidth={1.5}
              size={20}
              onClick={() => setOpen(false)}
            />
          ) : (
            <SidebarOpen
              fill="black"
              color="#F8F8F8"
              strokeWidth={1.5}
              size={20}
              onClick={() => setOpen(true)}
            />
          )}

          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-contrast">
            <h2>Dashboard</h2>
            <span>/</span>
            <h2 className="text-xs text-brand_color2 font-bold">
              {page || "Home"}
            </h2>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="text-contrast hover:text-secondary hidden">
            <span className="sr-only">Notifications</span>
            <Bell />
          </button>

          {/* Search */}
          <div className="hidden lg:flex items-center lg:gap-2 p-2 border border-base_grey rounded-full focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent text-contrast">
            <Search strokeWidth={1} size={16} />
            <input
              type="text"
              placeholder="Search"
              className="w-64 text-xs text-brand_color2 bg-transparent placeholder:text-xs border-0 focus:ring-0 focus:outline-none focus:border-0"
            />
          </div>
        </div>

        {/* User profile */}
        <div className="flex gap-2 items-center">
          <div className="flex lg:hidden items-center lg:gap-2 p-2 border border-base_grey rounded-full focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent text-contrast">
            <Search strokeWidth={1} size={16} />
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
