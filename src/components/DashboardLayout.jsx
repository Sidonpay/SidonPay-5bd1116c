import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useContext } from "react";
import SidebarContext from "../contexts/SidebarContext";

function DashboardLayout() {

  const { open, setOpen } = useContext(SidebarContext)

  return (
    <div className="flex h-dvh overflow-hidden max-w-[1980px] mx-auto bg-base_white lg:px-4 box-border border-x-2">
      <div
        className={`w-full h-full backdrop-blur-sm absolute top-0 left-0 z-10 ${
          open ? "md:hidden" : "hidden"
        }`} onClick={()=>setOpen(false)}
      ></div>
      {/* Sidebar */}
      <div
        className={`hidden md:block border-r transition-all duration-300 ease-linear bg-button bg-opacity-10 ${
          open ? "px-4" : "px-2"
        }`}
      >
        <Sidebar />
      </div>
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
