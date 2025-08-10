import BlogCard from "@/components/cards/BlogCard";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import Link from "next/link";
import { Blog } from "../../../generated/prisma";

const GET_BLOGS = gql`
  query AllBlogs {
    allBlogs {
      id
      title
      content
      imageUrl
    }
  }
`;

export default async function page() {
  const data = (await gqlClient.request(GET_BLOGS)) as { allBlogs: Blog[] };
  const blogs = data?.allBlogs || [];

  return (
    <div className="flex flex-col p-4 items-center min-h-screen">
      <h2 className="text-4xl font-bold">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 py-10">
        {blogs.map((blog) => (
          <Link key={blog.id} href={"/blog/" + blog.id}>
            <BlogCard blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  );
}
