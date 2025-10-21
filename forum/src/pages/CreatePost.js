import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [carModel, setCarModel] = useState('');
  const [topic, setTopic] = useState('General');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        image_url: imageUrl,
        car_model: carModel,
        topic,
        upvotes: 0,
      },
    ]);

    if (error) {
      console.error('Error creating post:', error.message);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="create-container">
      <h2 className="create-title">Create a New Car Post</h2>
      <form onSubmit={handleSubmit}>
        <label className="create-label">Title</label>
        <input
          className="create-input"
          placeholder="e.g. Best coilovers for WRX STI?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label className="create-label">Content</label>
        <textarea
          className="create-textarea"
          placeholder="Share your thoughts or questions..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <label className="create-label">Image URL</label>
        <input
          className="create-input"
          placeholder="https://example.com/car.jpg"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        <label className="create-label">Car Model</label>
        <input
          className="create-input"
          placeholder="e.g. Honda Civic Type R"
          value={carModel}
          onChange={e => setCarModel(e.target.value)}
        />

        <label className="create-label">Topic</label>
        <select
          className="create-select"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Mods">Mods</option>
          <option value="Track">Track</option>
          <option value="Advice">Advice</option>
          <option value="Build Log">Build Log</option>
        </select>

        <button type="submit" className="create-button">
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
