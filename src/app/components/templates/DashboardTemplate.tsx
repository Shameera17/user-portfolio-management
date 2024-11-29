import React, { useEffect } from "react";
import { TopNavBar } from "../organisms/navigation/TopNavBar";
import { H2 } from "../atoms/Typography";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/context/userContext";
export const DashboardTemplate = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const router = useRouter();
  const { user, login } = useUser();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      const { name, email } = session?.user || {};
      if (!user?.email && email) {
        login({
          name: name!,
          email: email!,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  return (
    <div className="flex flex-col">
      <TopNavBar />
      <div className="w-full sm:w-[592px] md:w-[720px] lg:w-[720px] mx-auto p-2 space-y-6">
        <H2 fontSize="20px" text={title} />
        {children}
      </div>
    </div>
  );
};
