import React from 'react';
import './PostCard.css';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`} className="post-card-link">
        
        {/* Small thumbnail image */}
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post thumbnail"
            className="post-card-image"
          />
        )}

        <div className="post-card-content">
          <h3 className="post-title">{post.title}</h3>

          <p className="post-meta">
            <strong>🏎️ Car:</strong> {post.car_model || 'N/A'} | <strong>🛠️ Topic:</strong> {post.topic || 'General'}
          </p>

          {/* Only show badge if post has 10 or more upvotes */}
          {post.upvotes >= 10 && (
            <div className="post-badge">
              🚀 Top Voted
            </div>
          )}

          <p className="post-upvotes">👍 Upvotes: {post.upvotes}</p>

          <p className="post-date">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>

      </Link>
    </div>
  );
}

export default PostCard;
