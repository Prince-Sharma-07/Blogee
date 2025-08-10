"use client";
import gqlClient from "@/services/graphQL";
import { gql } from "graphql-request";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../generated/prisma";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getUser: getCurrentUser {
      name
      email
    }
  }
`;

const userContext = createContext<{
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}>({
  user: undefined,
  setUser: () => {},
});

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const data: {
          getUser: User;
        } = await gqlClient.request(GET_CURRENT_USER);

        if (data?.getUser) {
          setUser(data.getUser);
        }
      } catch (err: any) {
        alert(err.message);
      }
    }
    getCurrentUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
