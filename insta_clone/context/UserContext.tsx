import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type User = {
  firstname: string;
  username: string;
  password: string;
  email: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<Partial<UserContextInterface>>({});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = () => {};
