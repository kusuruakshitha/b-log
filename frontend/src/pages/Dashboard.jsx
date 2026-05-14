import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const { data } = await api.get('/posts');
    setPosts(data.filter((post) => post.author?._id === user?.id || post.author?._id === user?._id));
  };

  useEffect(() => {
    if (user) loadPosts();
  }, [user]);

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Writer dashboard</p>
          <h1>{user?.name || 'Your'} archive</h1>
        </div>
        <Link to="/create" className="primary-button">
          New Post
        </Link>
      </section>
      <section className="post-grid">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} onChanged={loadPosts} />
        ))}
        {!posts.length && <p className="muted">You have not published any posts yet.</p>}
      </section>
    </main>
  );
};

export default Dashboard;
