import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function AuthorPage() {
  const { authorSlug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/posts.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const authorName = authorSlug.replace(/-/g, " ");
  
  
  const authorPosts = posts.filter((post) => {
    const postAuthorName = typeof post.author === 'string' 
      ? post.author 
      : post.author.name;
    return postAuthorName.toLowerCase() === authorName.toLowerCase();
  });

  return (
    <div>
      <h1>Posts by {authorName}</h1>
      {authorPosts.length === 0 ? (
        <p>No posts found by this author.</p>
      ) : (
        authorPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}