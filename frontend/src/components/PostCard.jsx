import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post, onChanged }) => {
  const { user } = useAuth();
  const date = post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Draft';
  const liked = Boolean(user && post.likes?.some((id) => id === user.id || id === user._id));

  const handleLike = async () => {
    if (!user) return;
    await api.patch(`/posts/${post._id}/like`);
    onChanged?.();
  };

  return (
    <article className="post-card">
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="post-cover" />}
      <div className="post-card-body">
        <div className="post-meta">
          <span>{post.author?.name || 'Thiranex Writer'}</span>
          <span>{date}</span>
        </div>
        <h2>{post.title}</h2>
        <p>{post.excerpt || post.content?.slice(0, 150)}</p>
        <div className="tag-row">
          {(post.tags || []).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="card-actions">
          <Link to={`/posts/${post._id}`} className="text-link">
            Read more
          </Link>
          <button type="button" className="mini-button" onClick={handleLike} disabled={!user}>
            {liked ? 'Liked' : 'Like'} · {post.likes?.length || 0}
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
