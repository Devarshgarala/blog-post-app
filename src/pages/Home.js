import { useEffect, useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
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
        console.error("Failed to load posts.json", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredPosts = posts.filter((post) => {
   
    if (!post) return false;
    
   
    const authorName = typeof post.author === 'string' 
      ? post.author 
      : post.author?.name || '';
    
   
    const searchableFields = [
      post.title || '',
      post.body || '',  
      authorName
    ];
    
    const searchLower = search.toLowerCase();
    
    return searchableFields.some((field) =>
      field.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}