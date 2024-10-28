import React from "react";
import Image from "next/image";

import { AvatarPopOver } from "./AvatarPopOver";

export const TopNavBar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-customGray mb-6 sm:mb-6 md:mb-9 lg:mb-10">
      <Image src="/images/Logo.svg" width={78} height={24} alt="logo" />
      <AvatarPopOver />
    </div>
  );
};
