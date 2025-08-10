import BlogCard from "@/components/cards/BlogCard";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import Link from "next/link";
import { Blog } from "../../../../generated/prisma";

const SEARCH_BLOGS = gql`
  query Blogs($q: String) {
    getBlogs(q: $q) {
      id
      title
      content
      imageUrl
    }
  }
`;

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const query = await searchParams;
  const q = query.q;

  const data: { getBlogs: Blog[] } = await gqlClient.request(SEARCH_BLOGS, {
    q: q,
  });
  const blogs = data.getBlogs;

  return (
    <div className="flex flex-col gap-2 p-4 items-center min-h-screen">
      <h2 className="text-4xl font-bold">Search Blogs</h2>
      <h3 className="text-2xl font-medium">Showing search results for : {q}</h3>
      <div className="grid grid-cols-4 gap-4 py-10 px-8">
        {blogs.length ? (
          blogs.map((blog) => (
            <Link key={blog.id} href={"/blog/" + blog.id}>
              <BlogCard blog={blog} />
            </Link>
          ))
        ) : (
          <div className="text-xl text-white">No Such Blogs Exists...</div>
        )}
      </div>
    </div>
  );
}
