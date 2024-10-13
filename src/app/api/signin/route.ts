import { connect } from "@/db/config";
import User from "@/db/models/UserModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: Request) {
  const { email, password } = await request.json();
  await connect();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials. Please try again" },
        { status: 400 }
      );
    }

    const userData = {
      name: user.name,
      email: user.email,
    };
    return NextResponse.json({ message: "Login successful", user: userData });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "User authorization failed" },
      { status: 500 }
    );
  }
}
