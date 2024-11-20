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

    const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    });
    const userData = {
      name: user.name || user.email,
      email: user.email,
      token,
    };

    const response = NextResponse.json(userData, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "User authorization failed" },
      { status: 500 }
    );
  }
}
