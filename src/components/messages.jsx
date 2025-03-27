import { useState, useEffect } from "react"
import { Envelope, Search, PencilSquare } from "react-bootstrap-icons"
import "../styles/messages.css"

export default function Messages() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")
  const [activeConversation, setActiveConversation] = useState(null)

  useEffect(() => {
    setLoading(true)
   
    setTimeout(() => {
      setConversations([
        {
          id: 1,
          user: {
            name: "Sarah Developer",
            username: "sarahdev",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          lastMessage: "Thanks for sharing that article!",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          unread: true,
        },
        {
          id: 2,
          user: {
            name: "Tech Guy",
            username: "techguy",
            avatar: "https://randomuser.me/api/portraits/men/85.jpg",
          },
          lastMessage: "Did you see the new React update?",
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          unread: false,
        },
        {
          id: 3,
          user: {
            name: "React Fan",
            username: "reactfan",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          },
          lastMessage: "Hooks are amazing!",
          timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
          unread: false,
        },
        {
          id: 4,
          user: {
            name: "Mike Hiker",
            username: "mikehiker",
            avatar: "https://randomuser.me/api/portraits/men/42.jpg",
          },
          lastMessage: "Let's go hiking this weekend!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          unread: false,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation)
    setConversations(conversations.map((c) => (c.id === conversation.id ? { ...c, unread: false } : c)))
  }

  return (
    <div className="messages">
      <div className="messages-header sticky-top">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h2 className="m-0 fw-bold">Messages</h2>
          <div>
            <PencilSquare size={20} className="me-3" />
            <Envelope size={20} />
          </div>
        </div>

        <div className="search-container d-flex align-items-center p-2">
          <div className="position-relative w-100">
            <div className="search-icon">
              <Search />
            </div>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search Direct Messages"
              className="form-control search-input"
            />
          </div>
        </div>
      </div>

      <div className="messages-content">
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : conversations.length > 0 ? (
          <div className="conversations-list">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${activeConversation?.id === conversation.id ? "active" : ""} ${conversation.unread ? "unread" : ""}`}
                onClick={() => handleConversationClick(conversation)}
              >
                <img
                  src={conversation.user.avatar || "/placeholder.svg"}
                  alt={conversation.user.name}
                  className="conversation-avatar rounded-circle"
                />
                <div className="conversation-content">
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="fw-bold">{conversation.user.name}</span>
                      <span className="text-muted ms-1">@{conversation.user.username}</span>
                    </div>
                    <span className="conversation-time text-muted">{formatTime(conversation.timestamp)}</span>
                  </div>
                  <div className="conversation-message">{conversation.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 text-muted">No messages to display</div>
        )}
      </div>
    </div>
  )
}

