import { useState, useEffect } from "react"
import { Bell, BellFill, Heart, ArrowRepeat, ChatLeft, PersonPlus } from "react-bootstrap-icons"
import "../styles/notifications.css"

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: "like",
          user: {
            name: "Sarah Developer",
            username: "sarahdev",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          content: "liked your post",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          tweetText: "Just shipped a new feature! 🚀 #coding #webdev",
        },
        {
          id: 2,
          type: "retweet",
          user: {
            name: "Tech Guy",
            username: "techguy",
            avatar: "https://randomuser.me/api/portraits/men/85.jpg",
          },
          content: "reposted your post",
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          tweetText: "Learning React has been an amazing journey.",
        },
        {
          id: 3,
          type: "reply",
          user: {
            name: "React Fan",
            username: "reactfan",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          },
          content: "replied to your post",
          timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
          tweetText: "Hooks are definitely my favorite feature!",
        },
        {
          id: 4,
          type: "follow",
          user: {
            name: "Mike Hiker",
            username: "mikehiker",
            avatar: "https://randomuser.me/api/portraits/men/42.jpg",
          },
          content: "followed you",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart className="notification-icon like" />
      case "retweet":
        return <ArrowRepeat className="notification-icon retweet" />
      case "reply":
        return <ChatLeft className="notification-icon reply" />
      case "follow":
        return <PersonPlus className="notification-icon follow" />
      default:
        return <Bell className="notification-icon" />
    }
  }

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab)

  return (
    <div className="notifications">
      <div className="notifications-header sticky-top">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h2 className="m-0 fw-bold">Notifications</h2>
          <BellFill size={20} />
        </div>

        <div className="notifications-tabs">
          <div
            className={`notifications-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
          <div
            className={`notifications-tab ${activeTab === "like" ? "active" : ""}`}
            onClick={() => setActiveTab("like")}
          >
            Likes
          </div>
          <div
            className={`notifications-tab ${activeTab === "retweet" ? "active" : ""}`}
            onClick={() => setActiveTab("retweet")}
          >
            Reposts
          </div>
          <div
            className={`notifications-tab ${activeTab === "reply" ? "active" : ""}`}
            onClick={() => setActiveTab("reply")}
          >
            Replies
          </div>
          <div
            className={`notifications-tab ${activeTab === "follow" ? "active" : ""}`}
            onClick={() => setActiveTab("follow")}
          >
            Follows
          </div>
        </div>
      </div>

      <div className="notifications-content">
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <div className="notification-icon-container">{getNotificationIcon(notification.type)}</div>
              <div className="notification-content">
                <div className="d-flex align-items-center">
                  <img
                    src={notification.user.avatar || "/placeholder.svg"}
                    alt={notification.user.name}
                    className="notification-avatar rounded-circle"
                  />
                  <div className="ms-2">
                    <span className="fw-bold">{notification.user.name}</span>
                    <span className="text-muted ms-1">@{notification.user.username}</span>
                    <span className="ms-1">{notification.content}</span>
                  </div>
                </div>
                {notification.tweetText && <div className="notification-tweet-text mt-2">{notification.tweetText}</div>}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-muted">No notifications to display</div>
        )}
      </div>
    </div>
  )
}

