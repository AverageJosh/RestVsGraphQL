// pages/index.tsx
import React from "react";
import Navbar from "./posts/navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="p-5">
        <h1>Welcome to the GraphQL vs Rest App</h1>
      </div>
    </div>
  );
};

export default Home;
