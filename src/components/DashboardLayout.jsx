import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout() {
  return (
    <div className="flex h-dvh overflow-hidden max-w-[1980px] mx-auto bg-base_white lg:px-6 box-border border-x-2">
      {/* Sidebar */}
      <Sidebar />

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
