import { useState, useEffect } from "react";
import TweetBox from "./tweet-box";
import Tweet from "./tweet";
import { dummyTweets } from "../data/dummy-data";
import { ArrowClockwise } from "react-bootstrap-icons";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error-fallback";
import "../styles/feed.css";

export default function Feed() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("for-you");

  const realTimeTweetPool = dummyTweets.slice(5);
  let realTimeIndex = 0;

  useEffect(() => {
    setLoading(true);
    try {
      const storedTweets = localStorage.getItem("tweets");
      setTimeout(() => {
        if (storedTweets) {
          setTweets(JSON.parse(storedTweets));
        } else {
          setTweets(dummyTweets.slice(0, 5));
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error loading tweets from localStorage:", error);
      setTweets(dummyTweets.slice(0, 5));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("tweets", JSON.stringify(tweets));
      } catch (error) {
        console.error("Error saving tweets to localStorage:", error);
      }
    }
  }, [tweets, loading]);

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        if (realTimeIndex < realTimeTweetPool.length) {
          const newTweet = {
            ...realTimeTweetPool[realTimeIndex],
            id: `${realTimeTweetPool[realTimeIndex].id}-${Date.now()}`,
            timestamp: new Date().toISOString(),
          };
          setTweets((prevTweets) => [newTweet, ...prevTweets]);
          realTimeIndex++;
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleAddTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const storedTweets = localStorage.getItem("tweets");
        if (storedTweets) {
          setTweets(JSON.parse(storedTweets));
        } else {
          setTweets(dummyTweets.slice(0, 5));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error refreshing tweets from localStorage:", error);
        setTweets(dummyTweets.slice(0, 5));
        setLoading(false);
      }
    }, 1000);
  };



  const handleAddComment = (tweetId, comment) => {
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            comments: [...(tweet.comments || []), comment],
            replies: tweet.replies + 1,
          };
        }
        return tweet;
      })
    );
  };

  const handleLikeTweet = (tweetId) => {
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const liked = tweet.liked ? tweet.liked : false;
          return {
            ...tweet,
            liked: !liked,
            likes: liked ? tweet.likes - 1 : tweet.likes + 1,
          };
        }
        return tweet;
      })
    );
  };

  const handleRetweetTweet = (tweetId) => {
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const retweeted = tweet.retweeted ? tweet.retweeted : false;
          return {
            ...tweet,
            retweeted: !retweeted,
            retweets: retweeted ? tweet.retweets - 1 : tweet.retweets + 1,
          };
        }
        return tweet;
      })
    );
  };

  const handleBookmarkTweet = (tweetId) => {
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const bookmarked = tweet.bookmarked ? tweet.bookmarked : false;
          return {
            ...tweet,
            bookmarked: !bookmarked,
          };
        }
        return tweet;
      })
    );
  };

  const filteredTweets = activeTab === "for-you"
    ? tweets
    : tweets.filter((tweet) => tweet.username === "johndoe");

  return (
    <div className="feed">
      <div className="feed-header sticky-top">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h2 className="m-0 fw-bold">Home</h2>
          <div>
            <button
              onClick={handleRefresh}
              className="btn btn-outline-primary rounded-circle p-2"
              disabled={loading}
            >
              <ArrowClockwise size={20} className={loading ? "spin" : ""} />
            </button>
        
          </div>
        </div>

        <div className="feed-tabs">
          <div
            className={`feed-tab ${activeTab === "for-you" ? "active" : ""}`}
            onClick={() => setActiveTab("for-you")}
          >
            For you
          </div>
          <div
            className={`feed-tab ${activeTab === "following" ? "active" : ""}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </div>
        </div>
      </div>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <TweetBox onAddTweet={handleAddTweet} />
      </ErrorBoundary>

      {loading ? (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="tweets-container">
          {filteredTweets.length > 0 ? (
            filteredTweets.map((tweet) => (
              <ErrorBoundary key={tweet.id} FallbackComponent={ErrorFallback}>
                <Tweet
                  tweet={tweet}
                  onAddComment={handleAddComment}
                  onLikeTweet={handleLikeTweet}
                  onRetweetTweet={handleRetweetTweet}
                  onBookmarkTweet={handleBookmarkTweet}
                />
              </ErrorBoundary>
            ))
          ) : (
            <div className="text-center p-4 text-muted">
              No tweets to show.
            </div>
          )}
        </div>
      )}
    </div>
  );
}