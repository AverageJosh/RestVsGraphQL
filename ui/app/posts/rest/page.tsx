"use client";

// pages/posts-rest.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../navbar";

// Define types for Post and Author
interface Post {
  id: string;
  title: string;
  author: {
    name: string;
  };
}

const PostsREST: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from the REST API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://localhost:7271/api/post/get", {
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
    <div className="bg-gray-200 min-h-screen py-6">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Rest Posts</h1>
        <ul className="list-none space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold underline text-blue-800">
                {post.title}
              </h3>
              <p className="text-gray-600">Author: {post.author.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostsREST;
