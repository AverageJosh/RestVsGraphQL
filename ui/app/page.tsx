// pages/index.tsx
import React from "react";
import Navbar from "./posts/navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the GraphQL Next.js App with TypeScript!</h1>
    </div>
  );
};

export default Home;
