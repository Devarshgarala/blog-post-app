import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  
  const authorName = typeof post.author === 'string' ? post.author : post.author.name;
  const authorSlug = authorName.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p> 
      <p><strong>Tags:</strong> {post.tags.join(", ")}</p>
      <p>
        <strong>Author:</strong>{" "}
        <Link to={`/author/${authorSlug}`}>
          {authorName}
        </Link>
      </p>
      
      
      {typeof post.author === 'object' && post.author.profilePicture && (
        <img 
          src={post.author.profilePicture} 
          alt={authorName}
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      )}
      
      
      {post.reactions && (
        <p>
          <strong>Likes:</strong> {post.reactions.likes} | 
          <strong>Views:</strong> {post.views}
        </p>
      )}
    </div>
  );
}