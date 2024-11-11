import { IProject } from "@/types/project";
import axios from "axios";

export const createProject = async (data: IProject): Promise<any> => {
  const response = await axios.post("/api/project", data);
  return response.data;
};
export const editProject = async (data: IProject, code: string) => {
  const response = await axios.put(`/api/project/${code}`, data);
  return response.data;
};
export const deleteProject = async (code: string) => {
  const response = await axios.delete(`/api/project/${code}`);
  return response.data;
};

export const getAllProjects = async (email: string): Promise<IProject[]> => {
  const response = await axios.get(`/api/project?email=${email}`);
  return response.data;
};
