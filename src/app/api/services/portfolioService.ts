import { IProject } from "@/types/project";
import axios from "axios";

export interface Portfolio {
  user: {
    jobTitle: string;
    name: string;
    bio: string;
    email: string;
    username: string;
    avatarUrl: string;
  };
  projectList: IProject[];
}

export const fetchUserPortfolio = async (
  username: string
): Promise<Portfolio> => {
  const response = await axios.get(`/api/portfolio?username=${username}`);
  return response.data;
};
