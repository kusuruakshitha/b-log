import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const CommentBox = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editingContent, setEditingContent] = useState('');

  const loadComments = async () => {
    try {
      setError('');
      const { data } = await api.get(`/comments/post/${postId}`);
      setComments(data);
    } catch (err) {
      setError('Comments are unavailable because the backend is not connected.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    const { data } = await api.post(`/comments/post/${postId}`, { content });
    setComments((current) => [data, ...current]);
    setContent('');
  };

  const handleDelete = async (commentId) => {
    await api.delete(`/comments/${commentId}`);
    setComments((current) => current.filter((comment) => comment._id !== commentId));
  };

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditingContent(comment.content);
  };

  const handleUpdate = async (event, commentId) => {
    event.preventDefault();
    const { data } = await api.put(`/comments/${commentId}`, { content: editingContent });
    setComments((current) =>
      current.map((comment) => (comment._id === commentId ? { ...comment, content: data.content } : comment))
    );
    setEditingId('');
    setEditingContent('');
  };

  return (
    <section className="comments">
      <h3>Comments</h3>
      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share your thoughts..."
            rows="3"
          />
          <button type="submit" className="primary-button">
            Post Comment
          </button>
        </form>
      )}
      {!user && <p className="muted">Login to join the discussion.</p>}
      {loading ? (
        <p className="muted">Loading comments...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="comment-list">
          {comments.map((comment) => (
            <article className="comment" key={comment._id}>
              <div className="comment-heading">
                <strong>{comment.author?.name || 'Reader'}</strong>
                {user && (comment.author?._id === user.id || comment.author?._id === user._id) && (
                  <div className="comment-tools">
                    <button type="button" className="text-button" onClick={() => startEdit(comment)}>
                      Edit
                    </button>
                    <button type="button" className="text-button danger-text" onClick={() => handleDelete(comment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {editingId === comment._id ? (
                <form className="comment-edit-form" onSubmit={(event) => handleUpdate(event, comment._id)}>
                  <input value={editingContent} onChange={(event) => setEditingContent(event.target.value)} />
                  <button type="submit" className="mini-button">
                    Save
                  </button>
                </form>
              ) : (
                <p>{comment.content}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentBox;
