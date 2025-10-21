import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function EditPost() {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [carModel, setCarModel] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching post:', error.message);
    } else if (data) {
      setTitle(data.title);
      setContent(data.content || '');
      setImageUrl(data.image_url || '');
      setCarModel(data.car_model || '');
      setTopic(data.topic || '');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        image_url: imageUrl,
        car_model: carModel,
        topic,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error.message);
    } else {
      window.location.href = '/'; // 🔥 Force reload Home page to see updated post
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Edit Post</h2>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Car Model"
        value={carModel}
        onChange={(e) => setCarModel(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}

export default EditPost;
