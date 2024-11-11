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
): Promise<{ message: string; data: UserProfile }> => {
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

export const signOut = async () => {
  try {
    const response = await axios.post("/api/logout");
    return response.data;
  } catch (error) {
    console.error("Sign out failed", error);
    throw error;
  }
};

export const updateUserImage = async (data: {
  email: string;
  avatarUrl: string;
  avatarPath: string;
}): Promise<{
  message: string;
  data: { avatarUrl: string; avatarPath: string };
}> => {
  const response = await axios.put("/api/avatar", data);
  return response.data;
};
export const deleteUserImage = async (
  email: string
): Promise<{ message: string }> => {
  const response = await axios.delete("/api/avatar", { data: { email } });
  return response.data;
};
export const fetchUserImage = async (
  email: string
): Promise<{ data: { avatarUrl: string; avatarPath: string } }> => {
  const response = await axios.get(`/api/avatar?email=${email}`);
  return response.data;
};
