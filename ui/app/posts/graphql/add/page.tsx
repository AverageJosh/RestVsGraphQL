"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Navbar from "../../navbar";

interface CreatePostData {
  addPost: {
    post: {
      title: string;
      author: {
        name: string;
      };
    };
  };
}

interface CreatePostVars {
  input: {
    title: string;
    authorName: string;
  };
}

const CREATE_POST = gql`
  mutation AddPost($input: AddPostInput!) {
    addPost(input: $input) {
      post {
        title
        author {
          name
        }
      }
    }
  }
`;

const AddPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [addPost, { data, loading }] = useMutation<
    CreatePostData,
    CreatePostVars
  >(CREATE_POST);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await addPost({
        variables: {
          input: {
            title,
            authorName,
          },
        },
      });

      setSuccess(true);
      setTitle("");
      setAuthorName("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Error :( {error}</p>;

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Add New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
            />
          </div>
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Author name"
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Post
          </button>
          {error && <p className="text-red-500">Error: {error}</p>}
          {success && (
            <p className="text-green-500">Post successfully created!</p>
          )}
        </form>
        {data && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">New Post Added</h3>
            <p>Title: {data.addPost.post.title}</p>
            <p>Author: {data.addPost.post.author.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
