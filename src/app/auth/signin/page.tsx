"use client";
import OAuthGroup from "@/app/components/molecules/OAuthGroup";
import { SignIn } from "@/app/components/organisms/form/SignIn";
import { AuthTemplate } from "@/app/components/templates/AuthTemplate";
import React from "react";

export default function SingInPage() {
  return (
    <AuthTemplate
      title="Login to account"
      subtitle="Enter your credentials to access your account"
    >
      <OAuthGroup />
      <SignIn />
    </AuthTemplate>
  );
}
