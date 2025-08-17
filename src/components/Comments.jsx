import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../utils/api'
import './Comments.css'

const Comments = ({ movieId }) => {
  const { isAuthenticated, user } = useAuth()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Get comments from localStorage
  const getCommentsFromStorage = () => {
    try {
      const storedComments = localStorage.getItem(`movie_comments_${movieId}`)
      return storedComments ? JSON.parse(storedComments) : []
    } catch (error) {
      console.error('Error reading comments from localStorage:', error)
      return []
    }
  }

  // Save comments to localStorage
  const saveCommentsToStorage = (commentsList) => {
    try {
      localStorage.setItem(`movie_comments_${movieId}`, JSON.stringify(commentsList))
    } catch (error) {
      console.error('Error saving comments to localStorage:', error)
    }
  }

  // Initialize sample comments if none exist
  const initializeSampleComments = () => {
    const existingComments = getCommentsFromStorage()
    if (existingComments.length === 0) {
      const sampleComments = [
        {
          id: Date.now() + 1,
          text: "This movie was absolutely amazing! The storyline was captivating and the acting was top-notch. Highly recommend!",
          rating: 5,
          username: "MovieLover123",
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          user_id: "sample_user_1"
        },
        {
          id: Date.now() + 2,
          text: "Really enjoyed this one. Great cinematography and the soundtrack was perfect. Will definitely watch again!",
          rating: 4,
          username: "CinemaFan",
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          user_id: "sample_user_2"
        },
        {
          id: Date.now() + 3,
          text: "Solid performance all around. The plot was well-developed and kept me engaged throughout. Worth watching!",
          rating: 4,
          username: "FilmCritic",
          created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          user_id: "sample_user_3"
        }
      ]
      saveCommentsToStorage(sampleComments)
      return sampleComments
    }
    return existingComments
  }

  useEffect(() => {
    fetchComments()
  }, [movieId])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const storedComments = initializeSampleComments()
      setComments(storedComments)
    } catch (error) {
      console.error('Error fetching comments:', error)
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !isAuthenticated) return

    setSubmitting(true)
    try {
      const newCommentObj = {
        id: Date.now() + Math.random(), // Generate unique ID
        text: newComment.trim(),
        rating: rating,
        username: user?.username || 'Anonymous',
        created_at: new Date().toISOString(),
        user_id: user?.id || 'anonymous'
      }
      
      const updatedComments = [newCommentObj, ...comments]
      setComments(updatedComments)
      saveCommentsToStorage(updatedComments)
      
      setNewComment('')
      setRating(5)
      
      // Show success message
      alert('Comment added successfully!')
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!isAuthenticated) return
    
    if (!confirm('Are you sure you want to delete this comment?')) return
    
    try {
      const updatedComments = comments.filter(c => c.id !== commentId)
      setComments(updatedComments)
      saveCommentsToStorage(updatedComments)
      alert('Comment deleted successfully!')
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('Failed to delete comment. Please try again.')
    }
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const renderRatingSelector = () => {
    return (
      <div className="rating-selector">
        <label>Rating:</label>
        <div className="star-buttons">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              className={`star-btn ${star <= rating ? 'active' : ''}`}
              onClick={() => setRating(star)}
              disabled={submitting}
            >
              {star <= rating ? '⭐' : '☆'}
            </button>
          ))}
        </div>
        <span className="rating-text">{rating} stars</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="comments-section">
        <h3>💬 Comments ({comments.length})</h3>
        <div className="loading-comments">
          <div className="spinner"></div>
          <p>Loading comments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="comments-section">
      <h3>💬 Comments ({comments.length})</h3>
      
      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <div className="comment-input-group">
            {renderRatingSelector()}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              rows="3"
              maxLength="500"
              disabled={submitting}
              required
            />
            <div className="comment-form-footer">
              <span className="char-count">
                {newComment.length}/500
              </span>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!newComment.trim() || submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner spinner-sm"></span>
                    Posting...
                  </>
                ) : (
                  'Post Comment'
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="login-prompt">
          <p>Please <a href="/login">login</a> to leave a comment</p>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-user-info">
                  <span className="comment-username">{comment.username}</span>
                  <span className="comment-rating">{renderStars(comment.rating)}</span>
                </div>
                <div className="comment-actions">
                  <span className="comment-date">
                    {formatDate(comment.created_at)}
                  </span>
                  {isAuthenticated && (user?.username === comment.username || user?.role === 'admin') && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="delete-comment-btn"
                      title="Delete comment"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
              <div className="comment-text">
                {comment.text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Comments
