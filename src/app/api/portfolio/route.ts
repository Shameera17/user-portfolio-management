import { connect } from "@/db/config";
import Project from "@/db/models/ProjectModal";
import User from "@/db/models/UserModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  await connect();
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const projects = await Project.find({ userId: user._id });
    return NextResponse.json(
      {
        projectList: projects.toReversed(),
        user: {
          jobTitle: user.jobTitle,
          name: user.name,
          bio: user.bio,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Cannot get projects data" },
      { status: 500 }
    );
  }
}
