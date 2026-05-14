import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';

const CreatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      const { data } = await api.get(`/posts/${id}`);
      setForm({
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        coverImage: data.coverImage || '',
        tags: (data.tags || []).join(', '),
      });
    };

    loadPost();
  }, [id]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      const { data } = id ? await api.put(`/posts/${id}`, payload) : await api.post('/posts', payload);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create post.');
    }
  };

  return (
    <main className="page narrow">
      <section className="section-heading">
        <p className="eyebrow">New story</p>
        <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
      </section>
      <form className="form editor-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Excerpt
          <input name="excerpt" value={form.excerpt} onChange={handleChange} />
        </label>
        <label>
          Cover image URL
          <input name="coverImage" value={form.coverImage} onChange={handleChange} />
        </label>
        <label>
          Tags
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="react, node" />
        </label>
        <label>
          Content
          <textarea name="content" value={form.content} onChange={handleChange} rows="12" required />
        </label>
        <button type="submit" className="primary-button">
          {id ? 'Update Post' : 'Publish Post'}
        </button>
      </form>
    </main>
  );
};

export default CreatePost;
