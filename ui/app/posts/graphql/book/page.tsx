"use client";

import { useSearchParams } from "next/navigation";
import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import Navbar from "../../navbar";

interface Author {
  name: string;
}

interface Post {
  id: string;
  title: string;
  author: Author;
}

interface GetPostData {
  post: Post;
}

interface GetPostParams {
  id: number;
}

export const GET_POSTS = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      title
      author {
        name
      }
    }
  }
`;

const Page: NextPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const { loading, error, data } = useQuery<GetPostData, GetPostParams>(
    GET_POSTS,
    {
      variables: { id: Number(id) },
      pollInterval: 5000,
    }
  );

  if (error) return <p>Error {error.message}</p>;

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-5">
        {loading && <p>Loading...</p>}
        {data && (
          <>
            <h1 className="mb-5">Posts</h1>
            <div className="flex flex-col">
              <div
                key={data.post.id}
                className="mb-2 border-b border-dashed w-96"
              >
                <h3>{data.post.title}</h3>
                <p className="ml-4">Author: {data.post.author.name}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
