import { useState, useRef } from "react"
import { generateId } from "../lib/utils"
import { Image, GeoAlt, Calendar, EmojiSmile, BarChartLine, XCircle } from "react-bootstrap-icons"
import "../styles/tweet-box.css"

export default function TweetBox({ onAddTweet }) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!input.trim() && !selectedImage) return

    setLoading(true)

    try {
      const newTweet = {
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
        image: selectedImage,
      }

      onAddTweet(newTweet)
      setInput("")
      setSelectedImage(null)

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    } catch (error) {
      console.error("Error creating tweet:", error)
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

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="tweet-box">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="tweet-box-avatar">
            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Your avatar" className="rounded-circle" />
          </div>

          <div className="tweet-box-input-container">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              placeholder="What's happening?"
              className="tweet-box-textarea form-control"
              rows={1}
            />

            {selectedImage && (
              <div className="selected-image-container mt-2 position-relative">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected"
                  className="selected-image img-fluid rounded"
                />
                <button
                  type="button"
                  className="btn btn-dark btn-sm rounded-circle remove-image-btn"
                  onClick={removeImage}
                >
                  <XCircle size={16} />
                </button>
              </div>
            )}

            <div className="tweet-box-actions d-flex justify-content-between align-items-center mt-3">
              <div className="tweet-box-icons">
                <button type="button" className="tweet-box-icon-btn" onClick={handleImageClick}>
                  <Image size={18} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="d-none"
                />
                <button type="button" className="tweet-box-icon-btn">
                  <BarChartLine size={18} />
                </button>
                <button type="button" className="tweet-box-icon-btn">
                  <EmojiSmile size={18} />
                </button>
                <button type="button" className="tweet-box-icon-btn">
                  <Calendar size={18} />
                </button>
                <button type="button" className="tweet-box-icon-btn">
                  <GeoAlt size={18} />
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary rounded-pill px-3 py-1"
                disabled={(!input.trim() && !selectedImage) || loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

