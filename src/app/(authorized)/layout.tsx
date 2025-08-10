import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import getUserFromCookies from "@/helper";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const user = await getUserFromCookies();
  if (!user) redirect("/");
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
