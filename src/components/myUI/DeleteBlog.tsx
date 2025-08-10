"use client";
export const dynamic = 'force-dynamic';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const DELETE_BLOG = gql`
  mutation Mutation($id: String!) {
    deletedBlog: deleteBlog(id: $id) {
      success
      message
    }
  }
`;

export function DeleteBlog({ id }: { id: string }) {
  const router = useRouter();
  async function handleDelete() {
    try {
      const res: {
        deletedBlog: response
      } = await gqlClient.request(DELETE_BLOG, { id });
      const data = res.deletedBlog;
      alert(data?.message);
      if (data?.success) {
        router.push('/')
      }
    } catch (err: any) {
      alert(err?.message);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 bg-black text-white font-medium rounded-md px-2 py-1 cursor-pointer">
          Delete <Trash className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            Note: This action cannot be undone. This will permanently delete
            your 'Blog' and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
