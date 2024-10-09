// components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="flex gap-x-5 py-5 border-b-2 border-black">
      <CustomLink href="/">Home</CustomLink>
      <CustomLink href="/posts/graphql">GraphQL Posts</CustomLink>
      <CustomLink href="/posts/graphql">Add GraphQL Posts</CustomLink>
      <CustomLink href="/posts/rest">Rest Posts</CustomLink>
      <CustomLink href="/posts/rest/add">Add Rest Posts</CustomLink>
    </div>
  );
};

const CustomLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link className="p-3 hover:bg-slate-400" href={href}>
      {children}
    </Link>
  );
};

export default Navbar;
