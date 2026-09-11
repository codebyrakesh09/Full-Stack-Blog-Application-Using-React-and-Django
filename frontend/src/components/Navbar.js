import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>📝 My Blog</h1>
      </Link>
      <Link to="/create" className="nav-link">
        + New Post
      </Link>
    </nav>
  );
}

export default Navbar;
