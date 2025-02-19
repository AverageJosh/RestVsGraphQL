"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import Navbar from "../navbar";
import Link from "next/link";
import { GET_POSTS } from "./queries";
import type { GetPostsData } from "./types";

const Page: React.FC = () => {
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS, {
    pollInterval: 5000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-black">GraphQL Posts</h1>
        <ul className="list-none space-y-2">
          {data?.posts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-md shadow-md p-4 hover:shadow-2xl transition duration-300"
            >
              <Link
                href={{
                  pathname: "/posts/graphql/book",
                  query: { id: post.id },
                }}
              >
                <h3 className="text-lg font-semibold underline text-blue-800">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600">Author: {post.author.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
