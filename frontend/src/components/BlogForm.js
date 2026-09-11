import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, createPost, updatePost } from '../api';

function BlogForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === 'edit';

  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getPost(id)
        .then((res) => setForm(res.data))
        .catch(() => setError('Could not load this post.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSubmitting(true);
    setError('');

    const payload = {
      title: form.title,
      content: form.content,
      author: form.author || 'Anonymous',
    };

    const request = isEdit ? updatePost(id, payload) : createPost(payload);

    request
      .then((res) => navigate(`/post/${res.data.id}`))
      .catch(() => setError('Something went wrong while saving the post.'))
      .finally(() => setSubmitting(false));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Post' : 'Create New Post'}</h2>

      {error && <p className="error-text">{error}</p>}

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          placeholder="Your name (optional)"
        />
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your blog post here..."
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : isEdit ? 'Update Post' : 'Publish Post'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default BlogForm;
