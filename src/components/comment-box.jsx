import { useState, useRef } from "react"
import { generateId } from "../lib/utils"
import { Image, EmojiSmile, GeoAlt } from "react-bootstrap-icons"
import "../styles/comment-box.css"

export default function CommentBox({ tweetId, onAddComment, onCancel }) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    setLoading(true)

    try {
      const newComment = {
        id: generateId(),
        text: input,
        username: "NambiarAnjaliP",
        name: "Anjali P Nambiar",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        verified: true,
        timestamp: new Date().toISOString(),
        likes: 0,
        retweets: 0,
        replies: 0,
        comments: [],
      }

      onAddComment(newComment)
      setInput("")
    } catch (error) {
      console.error("Error creating comment:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTextareaChange = (e) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <div className="comment-box">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="comment-avatar">
            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Your avatar" className="rounded-circle" />
          </div>

          <div className="comment-input-container">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              placeholder="Post your reply"
              className="comment-textarea form-control"
              rows={1}
            />

            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="comment-box-icons">
                <button type="button" className="comment-box-icon-btn">
                  <Image size={16} />
                </button>
                <button type="button" className="comment-box-icon-btn">
                  <EmojiSmile size={16} />
                </button>
                <button type="button" className="comment-box-icon-btn">
                  <GeoAlt size={16} />
                </button>
              </div>

              <div>
                <button type="button" className="btn btn-sm btn-outline-secondary me-2" onClick={onCancel}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary rounded-pill"
                  disabled={!input.trim() || loading}
                >
                  {loading ? "Replying..." : "Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

