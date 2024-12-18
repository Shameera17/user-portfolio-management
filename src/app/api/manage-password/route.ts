import { connect } from "@/db/config";
import User from "@/db/models/UserModel";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
// forgot password request
export async function POST(request: Request) {
  const req = await request.json();
  const { email } = req.data;
  await connect();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User has not registered using this e-mail address." },
        { status: 400 }
      );
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpiry = Date.now() + 60 * 60 * 1000; // 1 hour=60 minutes×60 seconds per minute×1000 milliseconds per second
    user.resetToken = resetPasswordToken;
    user.resetTokenExpiry = passwordResetExpiry;

    try {
      await user.save();
    } catch (err) {
      console.error("Error saving user:", err);
      return NextResponse.json(
        { message: "Failed to update reset token in the database." },
        { status: 500 }
      );
    }
    const resetUrl = `${process.env.AUTH_URL}/auth/choose-new-password/${resetToken}`;

    //send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_ACCOUNT_USER,
        pass: process.env.GOOGLE_ACCOUNT_PASS,
      },
    });
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
          <p>Hi ${user.name || "User"},</p>
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request this email, please ignore it.</p>
          <p>Thanks, <br/>The Support Team</p>
        `,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Reset link sent successfully to your email.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error has occured. Please try again" },
      { status: 500 }
    );
  }
}

// update password request
export async function PUT(request: Request) {
  const req = await request.json();
  const { token, password } = req.data;

  try {
    if (!token || !password) {
      return NextResponse.json(
        {
          message: "Invalid request",
        },
        { status: 400 }
      );
    }
    // hash the token to find the saved token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }, //saved time is still greater than the current time (Date.now()).
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset token." },
        { status: 400 }
      );
    }
    await user.resetPassword(password);
    try {
      await user.save();
    } catch (err) {
      console.error("Error saving user:", err);
      return NextResponse.json(
        { message: "Failed to update new password in the database." },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Password has been updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
