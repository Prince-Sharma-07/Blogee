"use client";
export const dynamic = 'force-dynamic';
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

const CREATE_BLOG = gql`
  mutation Mutation($title: String!, $content: String!, $imageUrl: String!) {
    createdBlog: createBlog(
      title: $title
      content: $content
      imageUrl: $imageUrl
    ) {
      success
      message
    }
  }
`;

export function AddBlog() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  async function handleCreate() {
    try {
      const res: {
        createdBlog: response
      } = await gqlClient.request(CREATE_BLOG, {
        title,
        content,
        imageUrl,
      });
      const data = res?.createdBlog;
      alert(data.message);
    } catch (err: any) {
      alert(err?.message);
    }
    setTitle("");
    setContent("");
    setImageUrl("");
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Blog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a New Blog</DialogTitle>
            <DialogDescription>
              Add Details of your blog here. Click upload when you&apos;re done.
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
                placeholder="eg. my first blog"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="eg. hi there"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image-url">Image Url</Label>
              <Input
                id="image-url"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="eg. http://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
               <Button onClick={handleCreate}>Upload</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
