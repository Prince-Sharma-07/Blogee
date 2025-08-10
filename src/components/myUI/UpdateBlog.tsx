"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import { useState } from "react";
import { Blog } from "../../../generated/prisma";

const UPDATE_BLOG = gql`
  mutation Mutation(
    $id: String!
    $title: String
    $content: String
    $imageUrl: String
  ) {
    updatedBlog: updateBlog(
      id: $id
      title: $title
      content: $content
      imageUrl: $imageUrl
    ) {
      message
      success
    }
  }
`;

export function UpdateBlog({ blog }: { blog: Blog }) {
  const [title, setTitle] = useState<string>(blog.title);
  const [content, setContent] = useState<string>(blog.content);
  const [imageUrl, setImageUrl] = useState<string>(blog.imageUrl);

  async function handleUpdate() {
    try {
      const res: {
        updatedBlog: response;
      } = await gqlClient.request(UPDATE_BLOG, {
        id: blog.id,
        title,
        content,
        imageUrl,
      });
      const data = res?.updatedBlog;
      alert(data.message);
    } catch (err: any) {
      alert(err?.message);
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Update Blog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update your Blog</DialogTitle>
            <DialogDescription>
              Update Details of your blog here. Click update when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Update title"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Update content"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image-url">Image Url</Label>
              <Input
                id="image-url"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Update image"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
