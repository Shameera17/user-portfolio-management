"use client";
import { ProfileSetting } from "@/app/components/organisms/form/ProfileSetting";
import { AvatarUpload } from "@/app/components/organisms/upload/AvatarUpload";
import { DashboardTemplate } from "@/app/components/templates/DashboardTemplate";
import React from "react";

export default function ProfilePage() {
  return (
    <DashboardTemplate title="Profile settings">
      <div className="space-y-6 border border-customGray rounded-lg p-4">
        <AvatarUpload />
        <ProfileSetting />
      </div>
    </DashboardTemplate>
  );
}
