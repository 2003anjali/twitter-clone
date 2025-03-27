import { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { dummyTrends, dummySuggestions } from "../data/dummy-data";
import "../styles/widgets.css";

export default function Widgets() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredTrends, setFilteredTrends] = useState(dummyTrends); 

  const handleSearch = (input) => {
    setSearchInput(input);
    const lowerInput = input.toLowerCase();
    const filtered = dummyTrends.filter(
      (trend) =>
        trend.title.toLowerCase().includes(lowerInput) ||
        trend.category.toLowerCase().includes(lowerInput)
    );
    setFilteredTrends(filtered);
  };

  return (
    <div className="widgets">
      <div className="search-container sticky-top">
        <div className="position-relative">
          <div className="search-icon">
            <Search size={20} />
          </div>
          <input
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)} 
            type="text"
            placeholder="Search X"
            className="form-control search-input"
          />
        </div>
      </div>

      <div className="trends-container mt-3">
        <h4 className="trends-header fw-bold p-3">What's happening</h4>
        {filteredTrends.map((trend) => ( 
          <div key={trend.id} className="trend-item">
            <div className="d-flex justify-content-between">
              <span className="trend-category">{trend.category} · Trending</span>
            </div>
            <div className="trend-title fw-bold">{trend.title}</div>
            <div className="trend-tweets">{trend.tweetCount.toLocaleString()} posts</div>
          </div>
        ))}
        <button className="show-more-btn">Show more</button>
      </div>

      <div className="suggestions-container mt-3">
        <h4 className="suggestions-header fw-bold p-3">Who to follow</h4>
        {dummySuggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-item d-flex align-items-center">
            <img
              src={suggestion.avatar || "/placeholder.svg"}
              alt={suggestion.name}
              className="suggestion-avatar rounded-circle"
            />
            <div className="suggestion-info ms-3">
              <div className="suggestion-name fw-bold">{suggestion.name}</div>
              <div className="suggestion-username text-muted">@{suggestion.username}</div>
            </div>
            <button className="btn btn-dark rounded-pill ms-auto follow-btn">Follow</button>
          </div>
        ))}
        <button className="show-more-btn">Show more</button>
      </div>
    </div>
  );
}