import React from "react";
import { TopNavBar } from "../organisms/navigation/TopNavBar";
import { H2 } from "../atoms/Typography";

export const DashboardTemplate = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) => {
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
