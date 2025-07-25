import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import SidebarContext from "../contexts/SidebarContext";
import { X } from "lucide-react";

const HiddenSidebar = () => {
  const { open, setOpen } = useContext(SidebarContext);

  return (
    <div className={`absolute top-0 left-0 w-full h-screen transition-transform duration-500 ${ open ? "bg-brand_color2 bg-opacity-20 block" : "bg-blue-400 hidden" }`}>
      <div
        className={`lg:hidden bg-[#EEF8F3] h-full pt-4 w-fit top-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-linear`}
      >
        <X className="absolute end-0 right-3" onClick={() => setOpen(false)} />
        <Sidebar />
      </div>
    </div>
  );
};

export default HiddenSidebar;
