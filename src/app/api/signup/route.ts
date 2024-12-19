import { connect } from "@/db/config";
import User from "@/db/models/UserModel";
import { ensureUniqueUsername } from "@/lib/helper/generateUsername";
import { extractNameFromEmail } from "@/lib/helper/regex";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connect();

  const { email, password } = await request.json();

  //check if user is aready created
  const isExist = await User.findOne({ email });
  if (isExist) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  try {
    const name = extractNameFromEmail(email);
    const username = await ensureUniqueUsername(name);
    const user = new User({ email, password, username });

    await user.save();
    return NextResponse.json({ message: "Sign up success" });
  } catch (error) {
    return NextResponse.json({ message: "Sign up failed" }, { status: 500 });
  }
}
