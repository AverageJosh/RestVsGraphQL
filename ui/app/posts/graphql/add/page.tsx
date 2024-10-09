"use client";

// pages/addPost.tsx
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

  console.log(data);
  return (
    <div className="flex flex-col">
      <Navbar />
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-3 w-1/2">
          <input
            className="text-black pl-1"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
          <input
            className="text-black pl-1"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author name"
            required
          />
          <button className="hover:bg-slate-400" type="submit">
            Add Post
          </button>
        </div>
      </form>

      {error && <p>Error: {error}</p>}
      {success && <p>Post successfully created!</p>}
      {data && (
        <div>
          <h3>New Post Added</h3>
          <p>Title: {data.addPost.post.title}</p>
          <p>Author: {data.addPost.post.author.name}</p>
        </div>
      )}
    </div>
  );
};

export default AddPost;
