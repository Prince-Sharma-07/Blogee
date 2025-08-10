"use client";

export default function AddBulkBlogs() {
  // async function handlePush() {      // put this in server action or api endpoint
  //   try {
  //     const res = await prismaClient.blog.createMany({
  //       data: Blogs,
  //     });
  //   } catch (err: any) {
  //     console.log(err.message);
  //   }
  // }
  // handlePush()
  return (
    <button className="bg-blue-400 px-2 p-1 rounded-md">
      Add blogs
    </button>
  );
}
