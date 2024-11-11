// pages/api/projects/[code].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/db/config";
import Project from "@/db/models/ProjectModal";
import { IProject } from "@/types/project";
import User, { IUser } from "@/db/models/UserModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  await connect();

  if (req.method === "POST" && code === "new") {
    // Handle project creation
    const projectData: IProject = req.body;
    const { _id: userId } = (await User.findOne({
      email: projectData.email,
    }).exec()) as IUser;
    const projectCode = Number(await Project.countDocuments()) + 1;
    const project = new Project({
      ...projectData,
      code: `code_${projectCode}`,
      userId,
    });
    await project.save();
    res.status(201).json({
      message: "Project created successfully",
    });
  } else if (req.method === "PUT" && typeof code === "string") {
    // Handle project update
    const updatedData: IProject = req.body;

    const updatedProject = await Project.findOneAndUpdate(
      { code },
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: `Project with ID ${code} has been updated.`,
      updatedProject,
    });
  } else if (req.method === "DELETE" && typeof code === "string") {
    // Handle project deletion

    // Delete project from the database
    await Project.findOneAndDelete({ code });

    res.status(200).json({
      message: `Project with ID ${code} has been deleted.`,
    });
  } else {
    res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
