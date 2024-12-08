"use client";
import { useEffect, useState } from "react";
import { useUser } from "./context/userContext";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
export default function Home() {
  const router = useRouter();
  const { user, login } = useUser();
  const [progress, setProgress] = useState(13);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!status || status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
      // check if user email is already stored and session email is available
      const { name, email } = session?.user || {};
      if (!user?.email && email) {
        login({
          name: name!,
          email: email!,
        });
      }
      router.push("/dashboard/profile");
    }
  }, [session, status, router]);
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
