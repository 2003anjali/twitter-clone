import { useEffect } from "react";
import { useTheme } from "./components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Feed from "./components/feed";
import Widgets from "./components/widgets";
import Explore from "./components/explore";
import Notifications from "./components/notifications";
import Messages from "./components/messages";
import Bookmarks from "./components/bookmarks";
import Profile from "./components/profile";
import "./styles/app.css";
import "./styles/custom.css";

function App() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  }, [theme]);

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-lg-2 sidebar-column">
              <Sidebar />
            </div>
            <div className="col-md-6 col-lg-7 feed-column border-start border-end">
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            <div className="col-md-3 col-lg-3 d-none d-md-block widgets-column">
              <Widgets />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;