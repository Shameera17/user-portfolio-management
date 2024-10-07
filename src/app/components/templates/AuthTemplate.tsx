import Image from "next/image";
import React from "react";
import { AuthLabelGroup } from "../molecules/AuthLabelGroup";

export const AuthTemplate = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="min-h-screen flex p-6">
      <section className="relative hidden md:flex md:w-1/3  h-auto">
        <Image src="/images/login-bg.svg" fill={true} alt="auth-side-img" />
      </section>
      <section className="md:w-2/3 h-auto ">
        <div className="max-w-sm ">
          <div>
            <Image src="/images/logo.svg" width={78} height={24} alt="logo" />
            <AuthLabelGroup title={title} subtitle={subtitle} />
          </div>
          {children}
        </div>
      </section>
    </div>
  );
};
