"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SIGN_UP = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    signUpUser(name: $name, email: $email, password: $password) {
      message
      success
    }
  }
`;
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignUp() {
    try {
      const res: {
        signUpUser: response;
      } = await gqlClient.request(SIGN_UP, {
        name,
        email,
        password,
      });
      const data = res.signUpUser;
      alert(data.message);
      if (data.success) {
        router.push("/");
      }
    } catch (err: any) {
      alert(err.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>SignUp to your account</CardTitle>
          <CardDescription>
            Enter your details below to create your new account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="eg. prince"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="atleast 8 characters"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSignUp} className="w-full">
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
