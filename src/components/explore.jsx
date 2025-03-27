import { useState, useEffect } from "react";
import { Search, ArrowClockwise } from "react-bootstrap-icons";
import { dummyTrends, dummyTweets } from "../data/dummy-data";
import Tweet from "./tweet";
import "../styles/explore.css";

export default function Explore() {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");
  const [trendingTweets, setTrendingTweets] = useState([]);
  const [filteredTrends, setFilteredTrends] = useState(dummyTrends);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffled = [...dummyTweets].sort(() => 0.5 - Math.random());
      setTrendingTweets(shuffled.slice(0, 3));
      setFilteredTrends(dummyTrends);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (input) => {
    setSearchInput(input);
    const lowerInput = input.toLowerCase();
    const filtered = dummyTrends.filter(
      (trend) =>
        trend.title.toLowerCase().includes(lowerInput) ||
        trend.category.toLowerCase().includes(lowerInput)
    );
    setFilteredTrends(filtered);
    const filteredTweets = dummyTweets.filter(
      (tweet) =>
        tweet.text.toLowerCase().includes(lowerInput) ||
        tweet.username.toLowerCase().includes(lowerInput)
    );
    setTrendingTweets(filteredTweets.slice(0, 3));
  };

  const renderTabContent = () => {
    if (activeTab !== "trending") {
      return (
        <div className="text-center p-4 text-muted">
          No trending {activeTab} content right now.
        </div>
      );
    }

    return (
      <>
        <div className="trends-section">
          <h4 className="trends-header fw-bold p-3">Trends for you</h4>
          {filteredTrends.length > 0 ? (
            filteredTrends.map((trend) => (
              <div key={trend.id} className="trend-item">
                <div className="d-flex justify-content-between">
                  <span className="trend-category">{trend.category} · Trending</span>
                </div>
                <div className="trend-title fw-bold">{trend.title}</div>
                <div className="trend-tweets">{trend.tweetCount.toLocaleString()} posts</div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-muted">No matching trends found.</div>
          )}
        </div>
        <div className="trending-tweets-section mt-3">
          <h4 className="trends-header fw-bold p-3">What's happening</h4>
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : trendingTweets.length > 0 ? (
            trendingTweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
          ) : (
            <div className="text-center p-4 text-muted">No matching tweets found.</div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="explore">
      <div className="explore-header sticky-top">
        <div className="search-container d-flex align-items-center p-2">
          <div className="position-relative w-100">
            <div className="search-icon">
              <Search />
            </div>
            <input
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search X"
              className="form-control search-input"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="btn btn-outline-primary rounded-circle p-2 ms-2"
            disabled={loading}
          >
            <ArrowClockwise size={20} className={loading ? "spin" : ""} />
          </button>
        </div>
        <div className="explore-tabs">
          <div
            className={`explore-tab ${activeTab === "trending" ? "active" : ""}`}
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </div>
          <div
            className={`explore-tab ${activeTab === "news" ? "active" : ""}`}
            onClick={() => setActiveTab("news")}
          >
            News
          </div>
          <div
            className={`explore-tab ${activeTab === "sports" ? "active" : ""}`}
            onClick={() => setActiveTab("sports")}
          >
            Sports
          </div>
          <div
            className={`explore-tab ${activeTab === "entertainment" ? "active" : ""}`}
            onClick={() => setActiveTab("entertainment")}
          >
            Entertainment
          </div>
        </div>
      </div>
      <div className="explore-content">{renderTabContent()}</div>
    </div>
  );
}