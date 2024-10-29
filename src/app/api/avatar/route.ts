import User from "@/db/models/UserModel";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { email, avatarUrl } = await request.json();

    // Update the user profile
    const updatedProfile = await User.findOneAndUpdate(
      { email },
      { avatarUrl },
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
        avaatarUrl: updatedProfile.avatarUrl,
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

export async function DELETE(request: Request) {
  try {
    const { email } = await request.json();

    // Update the user profile
    const updatedProfile = await User.findOneAndUpdate(
      { email },
      { avatarUrl: null },
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
        avaatarUrl: updatedProfile.avatarUrl,
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // Update the user profile
    const user = await User.findOne({ email });
    if (!user) {
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
      data: {
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch avatar" },
      { status: 500 }
    );
  }
}
