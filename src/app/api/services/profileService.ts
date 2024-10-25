// app/api/services/profileService.ts
import axios from "axios";

export interface UserProfile {
  name: string;
  email: string;
  jobTitle: string;
  bio: string;
}

// Fetch user profile by email
export const fetchUserProfile = async (email: string): Promise<UserProfile> => {
  const response = await axios.get(`/api/user?email=${email}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (
  data: UserProfile
): Promise<UserProfile> => {
  const response = await axios.put("/api/user", data);
  return response.data;
};

export const signUp = async (data: {
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    const response = await axios.post("/api/signup", data);
    return response.data;
  } catch (error) {
    console.error("Sign up failed", error);
    throw error;
  }
};
