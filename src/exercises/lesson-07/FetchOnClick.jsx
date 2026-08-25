import './Lesson07Styles.css';
import { useState } from 'react';
import { getSinglePost } from './api';

export default function FetchOnClick() {
  const [post, setPost] = useState();
  const [error, setError] = useState();

  const handleOnClick = async () => {
    try {
      const data = await getSinglePost(1);
      setPost(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={handleOnClick}>
        Get post
      </button>
      <div className="content">
        {!error && post ? (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
}
