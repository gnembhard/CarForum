import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!id) {
      console.error('No ID found in URL.');
      navigate('/');
      return;
    }
    fetchPost();
    fetchComments();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error loading post:', error.message);
    } else {
      setPost(data);
    }
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading comments:', error.message);
    } else {
      setComments(data);
    }
  }

  async function handleUpvote() {
    const { error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id);

    if (!error) {
      fetchPost();
    } else {
      console.error('Upvote failed:', error.message);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();

    if (newComment.trim() === '') return;

    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: id, content: newComment }]);

    if (!error) {
      setNewComment('');
      fetchComments();
    } else {
      console.error('Comment failed:', error.message);
    }
  }

  async function handleDeletePost() {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) {
      window.location.href = '/';
    } else {
      console.error('Delete failed:', error.message);
    }
  }

  if (!post) return <div>Loading post...</div>;

  return (
    <div className="postdetail-container">
      <h2 className="postdetail-title">{post.title}</h2>
      <p className="postdetail-meta">
        Posted on {new Date(post.created_at).toLocaleString()}
      </p>

      <p className="postdetail-meta">
        <strong>Vehicle:</strong> {post.car_model || 'N/A'} | <strong>Topic:</strong> {post.topic || 'General'}
      </p>

      {post.image_url && (
        <img className="postdetail-image" src={post.image_url} alt="Car" />
      )}

      <p className="postdetail-content">{post.content}</p>

      <div className="postdetail-buttons">
        <button onClick={handleUpvote} className="postdetail-button upvote-button">
          👍 Upvote ({post.upvotes})
        </button>

        <button
          onClick={() => navigate(`/edit/${post.id}`)}
          className="postdetail-button edit-button"
        >
          ✏️ Edit
        </button>

        <button
          onClick={handleDeletePost}
          className="postdetail-button delete-button"
        >
          🗑️ Delete
        </button>
      </div>

      <div className="postdetail-comments">
        <h3 className="text-lg font-semibold mb-2">💬 Comments</h3>

        <form onSubmit={handleAddComment} className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="comment-submit-button">
            Add Comment
          </button>
        </form>

        {comments.length === 0 ? (
          <p className="text-sm text-gray-400 mt-4">No comments yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                {c.content}
                <div className="comment-meta">
                  {new Date(c.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
