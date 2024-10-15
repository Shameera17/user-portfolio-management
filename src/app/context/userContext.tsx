"use client"; // Required for client-side components

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/user"; // Import the User type from types/user.ts
import { getCookie } from "@/lib/helper/cookie";

// Define the shape of the context's value
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create UserContext with initial value as undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context; // Return the context value
};

// Define the props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component to provide user data and functions
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Check session storage for user data when the component mounts
  useEffect(() => {
    if (sessionStorage.getItem("email"))
      setUser({
        token: getCookie("token")! || "",
        email: sessionStorage.getItem("email")! || "",
        name: sessionStorage.getItem("displayName")! || "",
      });
  }, []);

  // Function to log in the user
  const login = (userData: User) => {
    sessionStorage.setItem("displayName", userData.name);
    sessionStorage.setItem("email", userData.email);
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    sessionStorage.removeItem("displayName");
    sessionStorage.removeItem("email");
    setUser(null);
  };
  return (
    // Provide the context value to child components
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
