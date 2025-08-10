import Link from "next/link";
import { AddBlog } from "../myUI/AddBlog";

export default function Header() {
  return (
    <header className="h-16 py-2 px-10 flex items-center justify-between shadow-md sticky top-0 bg-white/80 backdrop-blur-3xl">
      <Link href={'/'}><h1 className="font-bold text-2xl">Blogee</h1></Link>
      <form
        action="/search"
        className="flex gap-2 border-2 rounded-md h-12 bg-white w-[60%]"
      >
        <input
          type="text"
          name="q"
          id=""
          className="border-none outline-none px-3 flex-1"
          placeholder="Search blogs..."
        />
        <button
          type="submit"
          className="border-none outline-none bg-blue-400 hover:bg-blue-500 h-full cursor-pointer px-2 rounded-r"
        >
          search
        </button>
      </form>
      <AddBlog />
      
      <Link className="" href={'/my-blogs'}>My Blogs</Link>
      <Link className="" href={'/login'}>Login</Link>
      <Link className="" href={'/signup'}>Register</Link>
    </header>
  );
}
