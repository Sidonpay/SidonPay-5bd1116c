import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SidebarMenu from "./SidebarMenu";
import icon from "/favicon.svg";
import logo from "/mainlogo.svg";
import { useContext, useState } from "react";
import {
  ChevronDown,
  ChartPie,
  ScrollText,
  CircleAlert,
  ReceiptText,
  ListChecks,
  Dices,
  BanknoteArrowDown,
  LogOut,
  UserCircle,
  CreditCard,
  Gift,
  FileChartColumn,
  X,
} from "lucide-react";
import SidebarContext from "../contexts/SidebarContext";

function Sidebar() {
  const [dropdown, setDropdown] = useState(false);
  const { open, setOpen } = useContext(SidebarContext);

  const { logout } = useAuth();

  const toggleDropdown = () => {
    // toggle for dropdown-menu and chevron rotation
    setDropdown((prev) => !prev);
  };

  return (
    <div className={`flex flex-col h-full`}>
      {/* Brand */}
      <div className={"flex items-center py-8"}>
        <img
          src={icon}
          alt="sidonpay logo"
          className={`${open ? "" : "mx-auto"}`}
        />
        <img
          src={logo}
          alt="sidonpay logo"
          className={`overflow-hidden transition-all duration-350 ease-linear ${
            open ? "w-24" : "w-0"
          } `}
        />
        {/* Only show X icon when sidebar is open */}
        {open && (
          <X
            className="ml-auto block md:block lg:hidden"
            fill="#2D7A51"
            color="#2D7A51"
            strokeWidth={1.5}
            size={32}
            onClick={() => setOpen(false)}
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-y-1 text-sm">
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
          className={`flex items-center gap-2 text-brand_color1 py-3 px-2 ${open ? "" : "justify-center "}`}
        >
          <Dices className={`${open ? "" : "w-0 hidden"}`} />
          <span
            className={`overflow-hidden transition-all duration-300 ease-linear ${
              open ? "w-48 md:w-32 lg:44 ml-2" : "w-0 ml-0 hidden"
            } `}
          >
            More
          </span>
          <ChevronDown
            className={`${open ? "ml-auto" : ""} transition-transform duration-300 ease-linear ${
              dropdown ? "-rotate-180" : ""
            }`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all transition-discrete duration-500 ${
            dropdown ? "max-h-48" : "max-h-0"
          }`}
        >
          <SidebarMenu
            path="opp"
            text="Financial Management"
            Icon={UserCircle}
          />
          <SidebarMenu path="opp" text="Virtual Cards" Icon={CreditCard} />
          <SidebarMenu path="opp" text="Gift Cards Management" Icon={Gift} />
          <SidebarMenu
            path="opp"
            text="Report and Analytics"
            Icon={FileChartColumn}
          />
        </div>
      </nav>

      {/* User & Logout */}
      <div className="mt-auto">
        <button
          className={`flex items-center gap-2 py-6 px-2 text-sm text-brand_color2 ${
            open ? "" : "mx-auto justify-center"
          }`}
          onClick={logout}
        >
          <LogOut size={20} />
          <span
            className={`overflow-hidden transition-all duration-500 ${
              open ? "w-38 md:44 ml-2" : "w-0 ml-0"
            } `}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
