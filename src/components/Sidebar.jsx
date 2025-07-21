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
      <nav className="p-4">
        <NavLink to="/">Overview</NavLink>
        <NavLink to="/payments-processing">Payments processing</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
        <NavLink to="/disputes">Disputes</NavLink>
        <NavLink to="/payouts">Payouts</NavLink>
        <NavLink to="/ai-transactions">AI Transactions</NavLink>
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
