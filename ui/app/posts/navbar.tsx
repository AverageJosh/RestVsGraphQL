// components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="flex gap-x-5 py-5 bg-blue-800 text-white">
      <CustomLink href="/">Home</CustomLink>
      <CustomLink href="/posts/graphql">GraphQL Posts</CustomLink>
      <CustomLink href="/posts/graphql/add">Add GraphQL Posts</CustomLink>
      <CustomLink href="/posts/graphql/subscribe">GraphQL Subscribe</CustomLink>
      <CustomLink href="/posts/rest">Rest Posts</CustomLink>
      <CustomLink href="/posts/schema">Rest Schema</CustomLink>
    </div>
  );
};

const CustomLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link className="p-3 hover:bg-blue-200 rounded-md text-white" href={href}>
      {children}
    </Link>
  );
};

export default Navbar;
