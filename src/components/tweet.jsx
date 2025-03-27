import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ChatLeft, ArrowRepeat, Heart, HeartFill, ThreeDots, Upload, Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";
import CommentBox from "./comment-box";
import { useTheme } from "./theme-provider";
import "../styles/tweet.css";

export default function Tweet({ tweet, onAddComment, onLikeTweet, onRetweetTweet, onBookmarkTweet }) {
  const [showComments, setShowComments] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [bookmarked, setBookmarked] = useState(tweet.bookmarked || false); 
  const { theme } = useTheme();

  const handleLike = () => {
    onLikeTweet(tweet.id);
  };

  const handleRetweet = () => {
    onRetweetTweet(tweet.id);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked); 
    onBookmarkTweet(tweet.id);
  };

  const handleAddComment = (comment) => {
    setShowComments(true);
    onAddComment(tweet.id, comment);
    setShowCommentBox(false);
  };

  return (
    <div className="tweet">
      <div className="d-flex">
        <div className="tweet-avatar">
          <img
            src={tweet.avatar || "/placeholder.svg"}
            alt={tweet.name}
            className="rounded-circle"
          />
        </div>
        <div className="tweet-content">
          <div className="d-flex justify-content-between">
            <div>
              <span className="fw-bold">{tweet.name}</span>
              {tweet.verified && (
                <span className="verified-badge ms-1 text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M22.5 12.5c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM10 17l-4-4 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
              )}
              <span className="text-muted ms-1">@{tweet.username}</span>
              <span className="text-muted ms-1">
                · {formatDistanceToNow(new Date(tweet.timestamp))} ago
              </span>
            </div>
            <Dropdown className="ms-auto">
              <Dropdown.Toggle as="div" className="tweet-more-btn">
                <ThreeDots />
              </Dropdown.Toggle>
              <Dropdown.Menu className={`dropdown-menu-${theme}`}>
                <Dropdown.Item href="#/not-interested">
                  Not interested in this post
                </Dropdown.Item>
                <Dropdown.Item href="#/follow">
                  Follow @{tweet.username}
                </Dropdown.Item>
                <Dropdown.Item href="#/mute">
                  Mute @{tweet.username}
                </Dropdown.Item>
                <Dropdown.Item href="#/block">
                  Block @{tweet.username}
                </Dropdown.Item>
                <Dropdown.Item href="#/report">Report post</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p className="mb-1">{tweet.text}</p>
          {tweet.image && (
            <div className="tweet-image mt-2">
              <img
                src={tweet.image}
                alt="Tweet media"
                className="img-fluid rounded"
              />
            </div>
          )}
          <div className="tweet-actions d-flex justify-content-between mt-2">
            <button
              className="tweet-action-btn"
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              <ChatLeft />
              {tweet.replies > 0 && (
                <span className="ms-2">{tweet.replies}</span>
              )}
            </button>
            <button
              className={`tweet-action-btn ${tweet.retweeted ? "text-success" : ""}`}
              onClick={handleRetweet}
            >
              <ArrowRepeat />
              {tweet.retweets > 0 && <span className="ms-2">{tweet.retweets}</span>}
            </button>
            <button
              className={`tweet-action-btn ${tweet.liked ? "text-danger" : ""}`}
              onClick={handleLike}
            >
              {tweet.liked ? <HeartFill /> : <Heart />}
              {tweet.likes > 0 && <span className="ms-2">{tweet.likes}</span>}
            </button>
            <button className="tweet-action-btn">
              <Upload />
            </button>
            <button
              className={`tweet-action-btn ${bookmarked ? "text-primary" : ""}`}
              onClick={handleBookmark}
            >
              {bookmarked ? <BookmarkFill /> : <Bookmark />}
            </button>
          </div>
          {tweet.comments && tweet.comments.length > 0 && (
            <div className="mt-2">
              <button
                className="btn btn-link tweet-toggle-replies p-0"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? "Hide replies" : "Show replies"}
              </button>
            </div>
          )}
          {showCommentBox && (
            <CommentBox
              onAddComment={handleAddComment}
              onCancel={() => setShowCommentBox(false)}
            />
          )}
          {showComments && tweet.comments && tweet.comments.length > 0 && (
            <div className="comments-container mt-2">
              {tweet.comments.map((comment) => (
                <div key={comment.id} className="comment d-flex">
                  <div className="comment-avatar">
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="comment-content">
                    <div>
                      <span className="fw-bold">{comment.name}</span>
                      <span className="text-muted ms-1">
                        @{comment.username}
                      </span>
                      <span className="text-muted ms-1">
                        · {formatDistanceToNow(new Date(comment.timestamp))} ago
                      </span>
                    </div>
                    <p className="mb-0">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}