"use client";

// pages/posts-rest.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../../navbar";

// Define types for Post and Author
interface Post {
  id: string;
  title: string;
  author: {
    name: string;
  };
}

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from the REST API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5287/api/post/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-5">
        <h1 className="mb-5">Posts</h1>
        <div className="flex flex-col">
          {posts.map((post) => (
            <div key={post.id} className="mb-2 border-b border-dashed w-96">
              <h3 className="">{post.title}</h3>
              <p className="ml-4">Author: {post.author.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
