"use client";
import { useUser } from "./context/userContext";
import { useRouter } from "next/navigation";
import { DashboardTemplate } from "./components/templates/DashboardTemplate";
import { AvatarUpload } from "./components/organisms/upload/AvatarUpload";
import { ProfileSetting } from "./components/organisms/form/ProfileSetting";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    router.push("/auth/signin");
  }
  return (
    <DashboardTemplate title="Profile settings">
      <div className="space-y-6 border border-customGray rounded-lg p-4">
        <AvatarUpload />
        <ProfileSetting />
      </div>
    </DashboardTemplate>
  );
}
