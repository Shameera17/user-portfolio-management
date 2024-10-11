"use client";

import { NewPassword } from "@/app/components/organisms/form/NewPassword";
import { AuthTemplate } from "@/app/components/templates/AuthTemplate";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <AuthTemplate
      title="Choose new password"
      subtitle="Enter your new password and you’re all set."
    >
      <NewPassword />
    </AuthTemplate>
  );
}
