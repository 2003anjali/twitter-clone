import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "./theme-provider"
import {
  House,
  Search,
  Bell,
  Envelope,
  Bookmark,
  Person,
  ThreeDots,
  MoonStars,
  Sun,
  BoxArrowRight,
} from "react-bootstrap-icons"
import { Dropdown } from "react-bootstrap"
import "../styles/sidebar.css"

function SidebarLink({ Icon, text, to, active }) {
  return (
    <Link to={to} className={`sidebar-link d-flex align-items-center ${active ? "active" : ""}`}>
      <Icon className="sidebar-icon" />
      <span className="d-none d-xl-inline ms-3">{text}</span>
    </Link>
  )
}

export default function Sidebar() {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div className="sidebar d-flex flex-column h-100 py-2">
      <div className="x-icon-container mb-2">
        <Link to="/" className="x-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
            <path
              fill="currentColor"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            ></path>
          </svg>
        </Link>
      </div>

      <div className="sidebar-links mt-2 mb-3">
        <SidebarLink Icon={House} text="Home" to="/" active={location.pathname === "/"} />
        <SidebarLink Icon={Search} text="Explore" to="/explore" active={location.pathname === "/explore"} />
        <SidebarLink
          Icon={Bell}
          text="Notifications"
          to="/notifications"
          active={location.pathname === "/notifications"}
        />
        <SidebarLink Icon={Envelope} text="Messages" to="/messages" active={location.pathname === "/messages"} />
        <SidebarLink Icon={Bookmark} text="Bookmarks" to="/bookmarks" active={location.pathname === "/bookmarks"} />
        <SidebarLink Icon={Person} text="Profile" to="/profile" active={location.pathname === "/profile"} />

        <Dropdown className="sidebar-dropdown">
          <Dropdown.Toggle as="div" className="sidebar-link d-flex align-items-center">
            <ThreeDots className="sidebar-icon" />
            <span className="d-none d-xl-inline ms-3">More</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className={`dropdown-menu-${theme}`}>
            <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="#/analytics">Analytics</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/logout">
              <BoxArrowRight className="me-2" />
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <button className="btn btn-primary tweet-btn rounded-pill d-none d-xl-block">Post</button>

      <div className="mt-auto">
        <button onClick={toggleTheme} className="theme-toggle-btn d-flex align-items-center mb-2">
          {theme === "dark" ? (
            <>
              <Sun className="sidebar-icon" />
              <span className="d-none d-xl-inline ms-3">Light Mode</span>
            </>
          ) : (
            <>
              <MoonStars className="sidebar-icon" />
              <span className="d-none d-xl-inline ms-3">Dark Mode</span>
            </>
          )}
        </button>

        <Dropdown className="user-profile-dropdown mb-3">
          <Dropdown.Toggle as="div" className="user-profile-toggle d-flex align-items-center">
            <img
              src="https://randomuser.me/api/portraits/women/32.jpg"
              alt="Your profile"
              className="rounded-circle user-avatar"
            />
            <div className="d-none d-xl-block ms-2">
              <div className="fw-bold">Anjali P Nambiar</div>
              <div className="text-muted">@NambiarAnjaliP</div>
            </div>
            <ThreeDots className="d-none d-xl-block ms-auto" />
          </Dropdown.Toggle>

          <Dropdown.Menu className={`dropdown-menu-${theme}`}>
          <Dropdown.Item as={Link} to="/profile">View profile</Dropdown.Item>
            <Dropdown.Item href="#/add-account">Add an existing account</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/logout">Log out @NambiarAnjaliP</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

