import {IProject} from "@/types/project";
import axios from "axios";

export const createProject = async (data: IProject) => {
    const response = await axios.post("/api/projects/new", data);
}
export const editProject = async( data:IProject, code:string) => {
    const response = await axios.put(`/api/projects/${code}`, data);
}
export const deleteProject = async (code:string) => {
    const response = await axios.delete(`/api/projects/${code}`);
}