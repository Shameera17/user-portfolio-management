import { connect } from "@/db/config";
import User from "@/db/models/UserModel";
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
    const profileData = {
      name: user.name || user.email,
      email: user.email,
      jobTitle: user.jobTitle,
      bio: user.bio,
    };
    return NextResponse.json(profileData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Cannot get user profile data" },
      { status: 500 }
    );
  }
}

// Handle PUT requests
export async function PUT(request: Request) {
  try {
    const { email, jobTitle, name, bio } = await request.json();

    // Update the user profile
    const updatedProfile = await User.findOneAndUpdate(
      { email },
      { jobTitle, name, bio },
      { new: true }
    );
    if (!updatedProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        email: updatedProfile.email,
        jobTitle: updatedProfile.jobTitle,
        name: updatedProfile.name,
        bio: updatedProfile.bio,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
