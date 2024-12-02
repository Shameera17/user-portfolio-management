import Image from "next/image";
import React, { useEffect } from "react";
import { AuthLabelGroup } from "../molecules/AuthLabelGroup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AuthTemplate = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    } else {
    }
  }, [session, status, router]);
  return (
    <div className="min-h-screen flex justify-center">
      {/* Left Section (Image) */}
      <section className="relative hidden md:flex md:w-1/3 h-screen">
        <Image
          src="/images/login-bg.svg"
          fill={true}
          alt="auth-side-img"
          className="object-fit p-6"
          loading="lazy"
        />
      </section>

      {/* Right Section (Form) */}
      <section className="flex flex-col justify-center items-center md:w-2/3 h-screen p-6">
        <div className="max-w-sm w-full">
          <div className="mb-8 flex flex-col place-items-center gap-3">
            <Image src="/images/Logo.svg" width={78} height={24} alt="logo" />
            <AuthLabelGroup title={title} subtitle={subtitle} />
          </div>

          {/* Children (Input Form) */}
          {children}
        </div>
      </section>
    </div>
  );
};
