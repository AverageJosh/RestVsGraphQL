"use client";

import React from "react";
import { useQuery, gql } from "@apollo/client";
import Navbar from "./navbar";

// Define the structure of the GraphQL response
interface Author {
  name: string;
}

interface Post {
  id: string;
  title: string;
  author: Author;
}

interface GetPostsData {
  posts: Post[];
}

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      author {
        name
      }
    }
  }
`;

const Page: React.FC = () => {
  // Use the useQuery hook and ensure data type safety
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <div>
      <Navbar />
      <h1>Posts</h1>
      <ul>
        {data?.posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Author: {post.author.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
