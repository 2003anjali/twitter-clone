import { useState, useEffect } from "react";
import { Calendar, GeoAlt, Link45deg } from "react-bootstrap-icons";
import Tweet from "./tweet";
import "../styles/profile.css";

export default function Profile() {
  const [userTweets, setUserTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        const storedTweets = localStorage.getItem("tweets");
        let allTweets = [];
        if (storedTweets) {
          allTweets = JSON.parse(storedTweets);
        }
        const filtered = allTweets.filter((tweet) => tweet.username === "NambiarAnjaliP");
        setUserTweets(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error loading tweets from localStorage:", error);
        setUserTweets([]);
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div className="profile">
      <div className="profile-header sticky-top">
        <div className="d-flex align-items-center p-3">
        
          <div>
            <h2 className="m-0 fw-bold">Anjali P Nambiar</h2>
            <span className="text-muted">{userTweets.length} posts</span>
          </div>
        </div>
      </div>

      <div className="profile-banner">
        <img src="https://picsum.photos/800/200" alt="Profile banner" className="profile-banner-img" />
      </div>

      <div className="profile-info p-3">
        <div className="d-flex justify-content-between">
          <img
            src="https://randomuser.me/api/portraits/women/32.jpg"
            alt="Profile"
            className="profile-avatar rounded-circle"
          />
          <button className="btn btn-outline-dark rounded-pill fw-bold">Edit profile</button>
        </div>

        <div className="mt-3">
          <h4 className="fw-bold mb-0">Anjali P Nambiar</h4>
          <div className="text-muted">@NambiarAnjaliP</div>

          <div className="profile-bio mt-2">
            Full-stack developer | React enthusiast | Building cool stuff on the web
          </div>

          <div className="profile-details d-flex flex-wrap mt-2">
            <div className="profile-detail me-3">
              <GeoAlt size={16} className="me-1" />
              <span>Mangalore, India</span>
            </div>
            <div className="profile-detail me-3">
              <Link45deg size={16} className="me-1" />
              <a href="https://www.linkedin.com/in/anjali-p-nambiar-9ab453241/" target="_blank" className="text-decoration-none">
                Linkedin
              </a>
            </div>
            <div className="profile-detail">
              <Calendar size={16} className="me-1" />
              <span>Joined March 2025</span>
            </div>
          </div>

          <div className="profile-stats d-flex mt-2">
            <div className="me-3">
              <span className="fw-bold">245</span> <span className="text-muted">Following</span>
            </div>
            <div>
              <span className="fw-bold">1.2K</span> <span className="text-muted">Followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <div className={`profile-tab ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>
          Posts
        </div>
        <div
          className={`profile-tab ${activeTab === "replies" ? "active" : ""}`}
          onClick={() => setActiveTab("replies")}
        >
          Replies
        </div>
        <div className={`profile-tab ${activeTab === "media" ? "active" : ""}`} onClick={() => setActiveTab("media")}>
          Media
        </div>
        <div className={`profile-tab ${activeTab === "likes" ? "active" : ""}`} onClick={() => setActiveTab("likes")}>
          Likes
        </div>
      </div>

      <div className="profile-content">
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : userTweets.length > 0 ? (
          userTweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} onAddComment={() => {}} />)
        ) : (
          <div className="text-center p-4 text-muted">
            <h4>No posts yet</h4>
            <p>When you post, it will show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
}