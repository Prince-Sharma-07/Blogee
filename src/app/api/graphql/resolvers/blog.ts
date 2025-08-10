import getUserFromCookies from "@/helper";
import prismaClient from "@/services/prisma";
import { Blog } from "../../../../../generated/prisma";

//Read Operations

export async function getBlogById(x: any, args: any) {
  const id = args.id || "";
  const blog = await prismaClient.blog.findUnique({
    where: {
      id: id,
    },
  });
  return blog;
}

export async function filterBlogs(x: any, args: { q: string }) {
  const q = args.q || "";
  const filteredBlogs = await prismaClient.blog.findMany({
    where: {
      title: {
        contains: q,
        mode: "insensitive",
      },
    },
  });
  return filteredBlogs;
}

export async function getAllBlogs(x: any, args: any) {
  const res = await prismaClient.blog.findMany();
  return res;
}

// Mutation Operations

export async function createBlog(
  x: any,
  args: {
    title: string;
    content: string;
    imageUrl: string;
    userId: string;
  }
) {
  const user = await getUserFromCookies();
  if (!user)
    return {
      success: false,
      message: "User not Authenticated!",
    };
  const blogToSave = {
    title: args.title,
    content: args.content,
    imageUrl: args.imageUrl,
    userId: user.id,
  };
  try {
    const blog = await prismaClient.blog.create({
      data: blogToSave,
    });
    return {
      success: true,
      message: "Uploaded Successfully!",
    };
  } catch (err) {
    return {
      success: false,
      message: "Upload Failed!",
    };
  }
}

export async function deleteBlog(x: any, args: any) {
  const id = args.id;
  try {
    await prismaClient.blog.delete({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      message: "Blog Deleted Successfully!",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function updateBlog(x: any, args: Blog) {
  const blogToUpdate = {
    title: args.title,
    content: args.content,
    imageUrl: args.imageUrl,
  };
  try {
    await prismaClient.blog.update({
      where: {
        id: args.id,
      },
      data: blogToUpdate,
    });
    return {
      success: true,
      message: "Blog Updated Successfully!",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
}
