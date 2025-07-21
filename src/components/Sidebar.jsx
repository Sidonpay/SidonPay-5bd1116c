import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white border-r">
      {/* Brand */}
      <div className="p-4">
        <h1>SidonPay Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-col flex">
        <NavLink to="/">Overview</NavLink>
        <NavLink to="/payments-processing">Payments processing</NavLink>

        <NavLink to="/update-user-profile" className="font-bold text-red-500">
          User Profile
        </NavLink>
      </nav>

      {/* User & Logout */}
      <div className="absolute bottom-0 p-4">
        <p>{user?.name}</p>
        <p>{user?.role}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
