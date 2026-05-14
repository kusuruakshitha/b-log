import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await api.get('/posts', { params: { search } });
      setPosts(data);
    } catch (err) {
      setError('Could not load posts. Make sure the backend is running on http://localhost:5000.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadPosts, 250);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Ideas, essays, field notes</p>
          <h1>Thiranex Blog Platform</h1>
          <p>
            A polished full-stack publishing space for writers to post stories, collect comments,
            and build a clean personal archive.
          </p>
        </div>
        <input
          className="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search posts by title or excerpt"
        />
      </section>

      {loading ? (
        <p className="muted">Loading posts...</p>
      ) : error ? (
        <section className="empty-state">
          <h2>Backend not connected</h2>
          <p>{error}</p>
        </section>
      ) : (
        <section className="post-grid">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} onChanged={loadPosts} />
          ))}
          {!posts.length && <p className="muted">No posts found yet.</p>}
        </section>
      )}
    </main>
  );
};

export default Home;
