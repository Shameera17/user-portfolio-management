// pages/api/projects/[code].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/db/config";
import Project from "@/db/models/ProjectModal";
import { IProject } from "@/types/project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  await connect();

  if (req.method === "POST" && code === "new") {
    // Handle project creation
    const projectData: IProject = req.body;
    const projectCode = Number(Project.countDocuments()) + 1;
    const project = new Project({
      ...projectData,
      code: `code_${projectCode}`,
    });
    await project.save();

    res.status(201).json({
      message: "Project created successfully",
    });
  } else if (req.method === "PUT" && typeof code === "string") {
    // Handle project update
    const updatedData: IProject = req.body;

    const updatedProject = Project.findOneAndUpdate({ code }, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: `Project with ID ${code} has been updated.`,
      updatedData, // Replace with `updatedProject` from database response
    });
  } else if (req.method === "DELETE" && typeof code === "string") {
    // Handle project deletion

    // Delete project from the database (example: db.deleteProject(code))
    // await db.deleteProject(code);

    res.status(200).json({
      message: `Project with ID ${code} has been deleted.`,
    });
  } else {
    res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
