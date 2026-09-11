import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="/create" element={<BlogForm mode="create" />} />
            <Route path="/edit/:id" element={<BlogForm mode="edit" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
