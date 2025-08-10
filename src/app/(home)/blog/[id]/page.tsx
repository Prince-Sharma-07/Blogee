import { DeleteBlog } from "@/components/myUI/DeleteBlog";
import { UpdateBlog } from "@/components/myUI/UpdateBlog";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import Image from "next/image";
import { Blog } from "../../../../../generated/prisma";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const id = p.id;

  const GET_BLOG = gql`
    query Blog($getBlogId: String) {
      getBlog(id: $getBlogId) {
        id
        title
        content
        imageUrl
      }
    }
  `;

  const data = (await gqlClient.request(GET_BLOG, { getBlogId: id })) as {
    getBlog: Blog;
  };
  const blog = data.getBlog;

  return (
    <div className="flex flex-col gap-6 items-center p-4 min-h-screen">
      <h2 className="text-4xl font-bold">Blog Details</h2>
      <Image src={blog.imageUrl} height={500} width={500} alt="blog_image" />
      <h3 className="text-lg font-medium">{blog.title}</h3>
      <p>{blog.content}</p>
      <UpdateBlog blog={blog} />
      <DeleteBlog id={blog.id} />
    </div>
  );
}
