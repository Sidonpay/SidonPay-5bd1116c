import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SidebarMenu from "./SidebarMenu";
import logoIcon from "/jo-sidonpay-logo-icon.svg"
import icon from "/favicon.svg";
import { useContext, useState } from "react";
import { ChevronDown, ChartPie, ScrollText, CircleAlert, ReceiptText, ListChecks, Dices, BanknoteArrowDown, LogOut } from "lucide-react";
import SidebarContext from "../contexts/SidebarContext";

function Sidebar() {
  const [dropdown, setDropdown] = useState(false)
  const { open } = useContext(SidebarContext)

  const { logout } = useAuth();

  const toggleDropdown = () => {
    console.log("done") //toggle for dropdown-menu and chevron rotation
    dropdown ? setDropdown(false) : setDropdown(true)
  };

  return (
    <div
      className={`flex flex-col transition-all duration-1000 ${
        open ? "w-1/5 max-w-72" : "w-[75px]"
      } bg-button bg-opacity-10 border-r`}
    >
      {/* Brand */}
      <div className={"py-8 px-4"}>
        <img
          src={open ? logoIcon : icon}
          alt="sidonpay logo"
          className={`${open ? "w-32" : "mx-auto"} `}
        />
      </div>

      {/* Navigation */}
      <nav className="px-4 flex-col flex gap-y-1 text-sm">
        <SidebarMenu path="/" Icon={ChartPie} text="Overview" />
        <SidebarMenu
          path="/payments-processing"
          Icon={ScrollText}
          text="Payments processing"
        />
        <SidebarMenu path="/reviews" Icon={ListChecks} text="Reviews" />
        <SidebarMenu path="/disputes" Icon={CircleAlert} text="Disputes" />
        <SidebarMenu path="/payouts" Icon={BanknoteArrowDown} text="Payouts" />
        <SidebarMenu
          path="/all-transactions"
          Icon={ReceiptText}
          text="All Transactions"
        />

        <div
          onClick={toggleDropdown}
          className="flex gap-2 text-brand_color1 px-2 py-3"
        >
          <Dices />
          <span className={` ${open ? "" : "hidden"} `}>More</span>
          <ChevronDown
            className={`ml-auto transition-transform duration-300 ${
              dropdown ? "-rotate-180" : ""
            }`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all transition-discrete duration-500 ${
            dropdown == true ? "max-h-48" : "max-h-0"
          }`}
        >
          <SidebarMenu path="opp" text="Financial Management" />
          <SidebarMenu path="opp" text="Virtual Cards" />
          <SidebarMenu path="opp" text="Gift Cards Management" />
          <SidebarMenu path="opp" text="Report and Analytics" />
        </div>
      </nav>

      {/* User & Logout */}
      <div className="mt-auto py-6">
        <button
          className={`w-full flex gap-2 text-brand_color2 px-2 ${
            open ? "" : "justify-center"
          }`}
          onClick={logout}
        >
          <LogOut />
          <span className={` ${open ? "" : "hidden"} `}>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
