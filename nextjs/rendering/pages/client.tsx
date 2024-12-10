import { useState, useEffect } from 'react';

export default function ClientPage() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/3')
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>Client-Side Rendering (CSR)</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
