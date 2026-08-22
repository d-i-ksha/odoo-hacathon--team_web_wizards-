import { NavLink, useNavigate } from "react-router-dom";
import {
  Users,
  Clock3,
  CalendarDays,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Employees",
      path: "/employee",
      icon: Users,
    },
    {
      label: "Attendance",
      path: "/employee/attendance",
      icon: Clock3,
    },
    {
      label: "Time Off",
      path: "/employee/leave",
      icon: CalendarDays,
    },
  ];

  const handleProfileClick = () => {
    navigate("/employee/profile");
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* Brand */}
        <NavLink to="/employee" className="navbar-brand">
          <img src={logo} alt="Dayflow" />

          <div className="navbar-brand-text">
            <span className="navbar-brand-name">Dayflow</span>
            <span className="navbar-brand-subtitle">HRMS</span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/employee"}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="navbar-actions">

          <button
            type="button"
            className="navbar-profile"
            onClick={handleProfileClick}
            aria-label="Open profile"
          >
            <UserCircle size={30} />
          </button>

          <button
            type="button"
            className="navbar-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="navbar-mobile">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/employee"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `navbar-mobile-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <button
            type="button"
            className="navbar-mobile-profile"
            onClick={handleProfileClick}
          >
            <UserCircle size={18} />
            <span>Profile</span>
          </button>

        </div>
      )}
    </header>
  );
}

export default Navbar;