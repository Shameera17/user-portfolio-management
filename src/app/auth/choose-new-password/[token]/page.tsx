"use client";

import { NewPassword } from "@/app/components/organisms/form/NewPassword";
import { AuthTemplate } from "@/app/components/templates/AuthTemplate";
import React from "react";
interface PageProps {
  params: { token: string };
}

export default function ForgotPasswordPage({ params }: PageProps) {
  const { token } = params;
  return (
    <AuthTemplate
      title="Choose new password"
      subtitle="Enter your new password and you’re all set."
    >
      <NewPassword token={token} />
    </AuthTemplate>
  );
}
