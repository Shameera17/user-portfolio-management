"use client";
import { useEffect, useState } from "react";
import { useUser } from "./context/userContext";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    } else {
      router.push("/dashboard/profile");
    }
  }, [user, router]);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}
