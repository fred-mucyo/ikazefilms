import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/api';
import './Comments.css';

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const guestId = React.useMemo(
    () => 'guest_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    [],
  );

  const getCommentsFromStorage = () => {
    try {
      const storedComments = localStorage.getItem(`movie_comments_${movieId}`);
      return storedComments ? JSON.parse(storedComments) : [];
    } catch (error) {
      console.error('Error reading comments from localStorage:', error);
      return [];
    }
  };

  const saveCommentsToStorage = (commentsList) => {
    try {
      localStorage.setItem(
        `movie_comments_${movieId}`,
        JSON.stringify(commentsList),
      );
    } catch (error) {
      console.error('Error saving comments to localStorage:', error);
    }
  };

  const initializeSampleComments = () => {
    const existingComments = getCommentsFromStorage();
    if (existingComments.length === 0) {
      const sampleComments = [
        {
          id: Date.now() + 1,
          text: 'Uduhe part 2',
          rating: 5,
          username: 'KAMI',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          user_id: 'sample_user_1',
        },
        {
          id: Date.now() + 2,
          text: 'Really enjoyed this one.',
          rating: 4,
          username: 'Alex',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          user_id: 'sample_user_2',
        },
      ];
      saveCommentsToStorage(sampleComments);
      return sampleComments;
    }
    return existingComments;
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const storedComments = initializeSampleComments();
      setComments(storedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const newCommentObj = {
        id: Date.now() + Math.random(),
        text: newComment.trim(),
        rating: rating,
        username: usernameInput.trim(),
        created_at: new Date().toISOString(),
        user_id: guestId,
      };

      const updatedComments = [newCommentObj, ...comments];
      setComments(updatedComments);
      saveCommentsToStorage(updatedComments);

      setNewComment('');
      setUsernameInput('');
      setRating(5);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const updatedComments = comments.filter((c) => c.id !== commentId);
      setComments(updatedComments);
      saveCommentsToStorage(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const renderRatingSelector = () => {
    return (
      <div className="rating-selector">
        <label>Rating:</label>
        <div className="star-buttons">
          {[1, 2, 3, 4, 5].map((star) => (
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
    );
  };

  if (loading) {
    return (
      <div className="comments-section">
        <h3>💬 Comments ({comments.length})</h3>
        <div className="loading-comments">
          <div className="spinner"></div>
          <p>Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="comments-section">
      <h3>💬 Comments ({comments.length})</h3>

      <form onSubmit={handleSubmitComment} className="comment-form">
        <div className="comment-input-group">
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Shyiramo izina ryawe (optional)"
            maxLength="50"
            disabled={submitting}
            className="username-input"
          />
          {renderRatingSelector()}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Gira icyo uvuaga kuri iyi Filime..."
            rows="3"
            maxLength="500"
            disabled={submitting}
            required
          />
          <div className="comment-form-footer">
            <span className="char-count">{newComment.length}/500</span>
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

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>Ba umbwere!! wandika comment 😁</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-user-info">
                  <span className="comment-username">
                    {comment.username || ''}
                  </span>
                  <span className="comment-rating">
                    {renderStars(comment.rating)}
                  </span>
                </div>
                <div className="comment-actions">
                  <span className="comment-date">
                    {formatDate(comment.created_at)}
                  </span>
                  {comment.user_id === guestId && (
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
              <div className="comment-text">{comment.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
