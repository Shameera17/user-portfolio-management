"use client";
import { useEffect } from "react";
import { useUser } from "./context/userContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProgressIndicator } from "./components/molecules/ProgressIndicator";

export default function Home() {
  const router = useRouter();
  const { user, login } = useUser();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!status || status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ProgressIndicator
        initialValue={13}
        targetValue={66}
        duration={500}
        fillToFull={true}
        fullFillDelay={1000}
      />
    </div>
  );
}
