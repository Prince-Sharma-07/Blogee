"use server";

import { cookies } from "next/headers";
import prismaClient from "./services/prisma";

export default async function getUserFromCookies() {
  try {
    const cookie = await cookies();
    const id = cookie.get("token")?.value || "";
    if (!id) return null;
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    return null;
  }
}
