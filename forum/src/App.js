import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';

function App() {
  return (
    <div>
      <nav className="mb-4 flex gap-4">
        <Link to="/">🏠 Home</Link>
        <Link to="/create">➕ Create Post</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
