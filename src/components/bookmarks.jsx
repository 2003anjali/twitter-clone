import { useState, useEffect } from "react";
import { BookmarkFill } from "react-bootstrap-icons";
import Tweet from "./tweet";
import "../styles/bookmarks.css";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        const storedTweets = localStorage.getItem("tweets");
        let allTweets = [];
        if (storedTweets) {
          allTweets = JSON.parse(storedTweets);
        }
    
        const bookmarkedTweets = allTweets.filter((tweet) => tweet.bookmarked === true);
        setBookmarks(bookmarkedTweets);
        setLoading(false);
      } catch (error) {
        console.error("Error loading bookmarked tweets from localStorage:", error);
        setBookmarks([]);
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div className="bookmarks">
      <div className="bookmarks-header sticky-top">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h2 className="m-0 fw-bold">Bookmarks</h2>
          <BookmarkFill size={20} />
        </div>
      </div>
      <div className="bookmarks-content">
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <Tweet
              key={bookmark.id}
              tweet={bookmark}
              onAddComment={() => {}}
              onLikeTweet={() => {}}
              onRetweetTweet={() => {}}
              onBookmarkTweet={() => {}}
            />
          ))
        ) : (
          <div className="text-center p-4 text-muted">
            <BookmarkFill size={48} className="mb-3" /> 
            <h4>Save posts for later</h4>
            <p>Bookmark posts to easily find them again in the future.</p>
          </div>
        )}
      </div>
    </div>
  );
}