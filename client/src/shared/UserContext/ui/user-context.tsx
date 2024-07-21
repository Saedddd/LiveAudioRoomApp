import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { createContext, useContext, useState } from "react";

interface User {
  username: string;
  name: string;
}

interface UserContextProvider {
  user: User | null;
  setUser: (user: User | null) => void;
  client: StreamVideoClient | undefined;
  setClient: (client: StreamVideoClient | undefined) => void;
}

const UserContext = createContext<UserContextProvider | undefined>(undefined);

interface UserProvideProps {
  children: React.ReactNode;
}

export const UserProvider = (props: UserProvideProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient>();

  return <UserContext.Provider value={{ user, setUser, client, setClient }}>{props.children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be within a Provider");
  }
  return context;
};
