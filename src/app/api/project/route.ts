import { connect } from "@/db/config";
import Project from "@/db/models/ProjectModal";
import User, { IUser } from "@/db/models/UserModel";
import { IProject } from "@/types/project";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  await connect();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const projects = await Project.find({ userId: user._id });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Cannot get projects data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connect();

  try {
    const projectData: IProject = await request.json();
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
    return NextResponse.json({ message: "Project creation success" });
  } catch (error) {
    return NextResponse.json(
      { message: "Project creation failed" },
      { status: 500 }
    );
  }
}
