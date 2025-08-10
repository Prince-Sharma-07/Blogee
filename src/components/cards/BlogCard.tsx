import Image from "next/image";
import { Blog } from "../../../generated/prisma";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="flex flex-col gap-4 h-120 rounded-2xl shadow-card">
      <Image
        src={blog.imageUrl || " "}
        height={360}
        width={360}
        alt="blog_image"
        className="rounded-t-2xl h-auto w-auto"
      />
      <div className="flex flex-col gap-2 px-4">
        <h2 className="font-medium text-lg">{blog.title}</h2>
        <p>{blog.content}</p>
      </div>
    </div>
  );
}
