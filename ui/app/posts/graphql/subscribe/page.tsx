"use client";

import React from "react";
import { useSubscription, gql } from "@apollo/client";
import Navbar from "../../navbar";

interface GetPostsData {
  onAdd: {
    id: string;
    title: string;
    author: {
      name: string;
    };
  };
}

const SUBSCRIBE_POSTS = gql`
  subscription SubscribePosts {
  onAdd {
    title 
    author {
      name
    }
  }
`;

const Page: React.FC = () => {
  const { loading, error, data } = useSubscription<GetPostsData>(
    SUBSCRIBE_POSTS,
    {
      onData: (options) => {
        console.log(options.data);
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-5">
        <h1 className="mb-5">Subscribed Posts</h1>
        {data && (
          <div className="flex flex-col">
            <div className="mb-2 border-b border-dashed w-96">
              <h3 className="">{data.onAdd.title}</h3>
              <p className="ml-4">Author: {data.onAdd.author.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
