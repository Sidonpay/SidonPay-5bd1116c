import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useContext } from "react";
import SidebarContext from "../contexts/SidebarContext";
import NotificationContext from "../contexts/NotificationContext";

function DashboardLayout() {

  const { open, setOpen } = useContext(SidebarContext)
  const { notify } = useContext(NotificationContext)

  return (
    <div className="flex h-dvh overflow-hidden relative max-w-[1920px] mx-auto bg-base_white box-border border-x-2">

      {/* Sidebar */}
      <div
        className={`hidden md:block border-r transition-all duration-300 ease-linear bg-button bg-opacity-10 ${
          open ? "px-4" : "px-1 lg:px-2"
        }`}
      >
        <Sidebar />
      </div>

      {/* Blurred Overlay */}
      <div
        className={`w-full h-full bg-brand_color2 bg-opacity-40 backdrop-blur-sm absolute top-0 left-0 z-10 ${
          open || notify ? "md:hidden" : "hidden"
        }`} onClick={()=>setOpen(false)}
      ></div>

      {/* Hidden Sidebar for Mobile */}
      <div
        className={`md:hidden absolute top-0 border-r h-full px-4 transition-all duration-300 ease-linear bg-[#E8F2EC] z-20 ${
          open ? "left-0" : "-left-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
