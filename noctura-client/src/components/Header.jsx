import { useEffect, useState } from "react";
import {
  Bookmark,
  Heart,
  History,
  LogOut,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../context/AuthContext";

const navigationLinks = [
  { to: "/home", label: "Home" },
  { to: "/search", label: "Discover", icon: Search },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/watchlist", label: "Watchlist", icon: Bookmark },
  { to: "/history", label: "History", icon: History },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.classList.remove("nav-open");
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Close the drawer after every successful route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  const avatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User",
    )}&background=ef1b2d&color=fff`;

  return (
    <>
      <header className={`app-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="app-header__inner">
          <Brand />

          <nav
            id="appNavigation"
            className={`app-nav ${open ? "is-open" : ""}`}
            aria-label="Primary navigation"
            aria-hidden={open ? "false" : undefined}
          >
            <div className="app-nav__mobile-head">
              <Brand />
              <button
                type="button"
                className="app-nav__close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="app-nav__links">
              {navigationLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/home"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {Icon ? <Icon size={18} aria-hidden="true" /> : <span className="nav-home-dot" />}
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>

            <div className="app-nav__mobile-profile">
              <Link to="/profile">
                <User size={19} aria-hidden="true" />
                <span>Profile</span>
              </Link>
              <button type="button" onClick={handleLogout}>
                <LogOut size={19} aria-hidden="true" />
                <span>Logout</span>
              </button>
            </div>
          </nav>

          <div className="header-user">
            <ThemeSwitcher compact />
            <Link to="/search" className="icon-button" aria-label="Search">
              <Search aria-hidden="true" />
            </Link>
            <Link to="/profile" className="avatar-link">
              <img src={avatar} alt={`${user?.name || "User"} avatar`} />
              <span>{user?.name?.split(" ")[0] || "Profile"}</span>
            </Link>
            <button
              type="button"
              className="icon-button logout-button"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-button menu-button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="appNavigation"
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        className={`nav-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      />
    </>
  );
}
