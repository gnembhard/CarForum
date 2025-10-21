import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import PostCard from '../components/PostCard';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    fetchPosts();
  }, [sortOption]); // Re-fetch when sort option changes

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortOption === 'upvotes' ? 'upvotes' : 'created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      console.log('Fetched posts:', data);
      setPosts(data);
    }
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSortChange(e) {
    setSortOption(e.target.value);
  }

  function resetSearch() {
    setSearchTerm('');
  }

  const filteredPosts = posts.filter(post => {
    const query = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      (post.car_model && post.car_model.toLowerCase().includes(query))
    );
  });

  return (
    <div className="home-container">
      <h1 className="home-title">🚗 Car Forum</h1>

      <div className="home-controls">
        <input
          type="text"
          className="home-search"
          placeholder="Search posts by title or vehicle..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select
          className="home-sort"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="newest">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      {/* Posts Section */}
      {filteredPosts.length === 0 ? (
        <div className="no-posts">
          <img
            src="https://i.pinimg.com/originals/2b/de/7d/2bde7d14133968f97d6c4dd898edb989.gif"
            alt="No posts found"
            className="no-posts-gif"
          />
          <h2>No posts found </h2>
          <p>Try searching for something else!</p>
          <button onClick={resetSearch} className="home-reset-button">
            🔄 Reset Search
          </button>
        </div>
      ) : (
        filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}

export default Home;
