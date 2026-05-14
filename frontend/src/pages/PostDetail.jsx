import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import CommentBox from '../components/CommentBox';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPost = async () => {
    const { data } = await api.get(`/posts/${id}`);
    setPost(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleLike = async () => {
    if (!user) return;
    const { data } = await api.patch(`/posts/${id}/like`);
    setPost({ ...data, author: post.author });
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete(`/posts/${id}`);
    navigate('/dashboard');
  };

  if (loading) {
    return <main className="page">Loading post...</main>;
  }

  if (!post) {
    return <main className="page">Post not found.</main>;
  }

  return (
    <main className="page narrow">
      <article className="post-detail">
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="detail-cover" />}
        <p className="eyebrow">{post.author?.name || 'Thiranex Writer'}</p>
        <h1>{post.title}</h1>
        <div className="tag-row">
          {(post.tags || []).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="detail-actions">
          <button type="button" className="mini-button" onClick={handleLike} disabled={!user}>
            Like · {post.likes?.length || 0}
          </button>
          {user && (post.author?._id === user.id || post.author?._id === user._id) && (
            <>
              <Link to={`/edit/${post._id}`} className="ghost-button">
                Edit
              </Link>
              <button type="button" className="danger-button" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
        <p className="post-content">{post.content}</p>
      </article>
      <CommentBox postId={id} />
    </main>
  );
};

export default PostDetail;
