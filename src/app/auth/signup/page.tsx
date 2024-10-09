"use client";

import OAuthGroup from "@/app/components/molecules/OAuthGroup";
import { SignUp } from "@/app/components/organisms/form/SignUp";
import { AuthTemplate } from "@/app/components/templates/AuthTemplate";
import React from "react";

export default function SignUpPage() {
  return (
    <AuthTemplate
      title="Create your account"
      subtitle="Enter the fields below to get started"
    >
      <OAuthGroup />
      <SignUp />
    </AuthTemplate>
  );
}
