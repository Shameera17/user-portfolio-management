"use client";
import { ProfileSetting } from "@/app/components/organisms/form/ProfileSetting";
import { DashboardTemplate } from "@/app/components/templates/DashboardTemplate";
import { useUser } from "@/app/context/userContext";
import React from "react";

export default function ProfilePage() {
  const { user } = useUser();
  if (!user) return <div>Loading...</div>;
  return (
    <DashboardTemplate title="Profile settings" children={<ProfileSetting />} />
  );
}
