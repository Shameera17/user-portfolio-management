"use client";

import { ForgotPassword } from "@/app/components/organisms/form/ForgotPassword";
import { AuthTemplate } from "@/app/components/templates/AuthTemplate";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <AuthTemplate
      title="Forgot password"
      subtitle="We’ll email you instructions to reset your password"
    >
      <ForgotPassword />
    </AuthTemplate>
  );
}
