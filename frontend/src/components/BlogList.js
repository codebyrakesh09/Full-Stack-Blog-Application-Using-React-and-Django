import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../api';
import SearchBar from './SearchBar';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = useCallback((term = '') => {
    setLoading(true);
    setError('');
    getPosts(term)
      .then((res) => {
        // Handle both paginated ({results: [...]}) and plain list responses.
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setPosts(data || []);
      })
      .catch(() => {
        setError('Could not load posts. Is the Django server running on port 8000?');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchPosts(term);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    deletePost(id)
      .then(() => setPosts((prev) => prev.filter((p) => p.id !== id)))
      .catch(() => alert('Failed to delete post.'));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading posts...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <div className="empty-state">
          <p>
            {searchTerm
              ? `No posts found matching "${searchTerm}".`
              : 'No posts yet. Create the first one!'}
          </p>
        </div>
      )}

      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <div className="meta">
            By {post.author || 'Anonymous'} &middot;{' '}
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <p>
            {post.content.length > 180
              ? `${post.content.slice(0, 180)}...`
              : post.content}
          </p>
          <div className="actions">
            <Link to={`/post/${post.id}`} className="btn btn-secondary">
              View
            </Link>
            <Link to={`/edit/${post.id}`} className="btn btn-primary">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
