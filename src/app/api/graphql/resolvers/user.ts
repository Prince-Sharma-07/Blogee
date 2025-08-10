import getUserFromCookies from "@/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

export async function signUpUser(
  x: any,
  args: {
    name: string;
    email: string;
    password: string;
  }
) {
  const cookie = await cookies();
  try {
    const user = await prismaClient.user.create({
      data: args,
    });
    if (user.id) {
      cookie.set("token", user.id);
    }
    return {
      success: true,
      message: "User Created Successfully!",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function loginUser(
  x: any,
  args: {
    email: string;
    password: string;
  }
) {
  const cookie = await cookies();
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: args.email,
      },
    });
    if (user?.password == args.password) {
      cookie.set("token", user.id);
      return {
        success: true,
        message: "User logged in Successfully!",
      };
    }
    return {
      success: false,
      message: "Invalid Credentials",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function getCurrentUserBlogs() {
  try {
    const user = await getUserFromCookies();
    if (!user) return [];

    const blogs = await prismaClient.blog.findMany({
      where: {
        userId: user.id,
      },
    });
    return blogs;
  } catch (err) {
    return [];
  }
}
