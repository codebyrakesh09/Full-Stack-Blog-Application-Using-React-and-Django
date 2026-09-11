import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost } from '../api';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPost(id)
      .then((res) => setPost(res.data))
      .catch(() => setError('Post not found.'));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    deletePost(id)
      .then(() => navigate('/'))
      .catch(() => alert('Failed to delete post.'));
  };

  if (error) return <p className="error-text">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div className="meta">
        By {post.author || 'Anonymous'} &middot;{' '}
        {new Date(post.created_at).toLocaleString()}
        {post.updated_at !== post.created_at &&
          ` (updated ${new Date(post.updated_at).toLocaleString()})`}
      </div>
      <div className="content">{post.content}</div>
      <div className="actions">
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
        <Link to={`/edit/${post.id}`} className="btn btn-primary">
          Edit
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;
