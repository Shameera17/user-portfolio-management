"use client";
import OAuthGroup from "@/app/components/molecules/OAuthGroup";
import { SignIn } from "@/app/components/organisms/form/SignIn";
import { AuthTemplate } from "@/app/components/templates/AuthTemplate";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SingInPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // if (session?.status) router.replace("/");
  }, []);

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
