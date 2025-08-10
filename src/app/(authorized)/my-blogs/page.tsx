"use client";
import BlogCard from "@/components/cards/BlogCard";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Blog, User } from "../../../../generated/prisma";

const GET_CURRENT_BLOGS = gql`
  query GetCurrentUserAndBlogs {
    userBlogs: getCurrentUserBlogs {
      content
      imageUrl
      id
      title
    }
    getUser: getCurrentUser {
      name
      email
    }
  }
`;

export default function MyBlogs() {
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getBlogs() {
      try {
        const data: {
          userBlogs: Blog[];
          getUser: User;
        } = await gqlClient.request(GET_CURRENT_BLOGS);
        if (data.userBlogs) {
          setUserBlogs(data?.userBlogs);
        }
        if (data?.getUser) {
          setUser(data.getUser);
        }
      } catch (err: any) {
        alert(err.message);
      }
    }
    getBlogs();
  }, []);
  return (
    <div className="flex flex-col p-4 items-center min-h-screen">
      <h2 className="text-4xl font-bold">My Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 py-10">
        {userBlogs.map((blog) => (
          <Link key={blog.id} href={"/blog/" + blog.id}>
            <BlogCard blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  );
}
