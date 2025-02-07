"use client";

import React from "react";
import { useQuery, gql } from "@apollo/client";
import Navbar from "../navbar";
import Link from "next/link";
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
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS, {
    pollInterval: 5000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-5">
        <h1 className="mb-5">Posts</h1>
        <div className="flex flex-col">
          {data?.posts.map((post) => (
            <div key={post.id} className="mb-2 border-b border-dashed w-96">
              <Link
                className="underline text-blue-400"
                href={{
                  pathname: "/posts/graphql/book",
                  query: { id: post.id },
                }}
              >
                <h3>{post.title}</h3>
              </Link>
              <p className="ml-4">Author: {post.author.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
