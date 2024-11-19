import { connect } from "@/db/config";
import Project from "@/db/models/ProjectModal";
import { IProject } from "@/types/project";
import { NextRequest } from "next/server";

async function updateProject(code: string, updatedData: IProject) {
  connect(); // Ensure database connection
  return await Project.findOneAndUpdate({ code }, updatedData, { new: true });
}

async function deleteProject(code: string) {
  connect(); // Ensure database connection
  return await Project.deleteOne({ code });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params; // Extract the project code
    const updatedData: IProject = await request.json();

    const updatedProject = await updateProject(code, updatedData);

    if (!updatedProject) {
      return new Response(
        JSON.stringify({ message: `Project with ID ${code} not found.` }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Project with ID ${code} has been updated.`,
        updatedProject,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update the project." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params; // Extract the project code
    const project = await deleteProject(code);

    if (project.acknowledged && project.deletedCount > 0) {
      return new Response(
        JSON.stringify({ message: "Project deleted successfully." }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ message: `Project with ID ${code} not found.` }),
      { status: 404 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete the project." }),
      { status: 500 }
    );
  }
}
