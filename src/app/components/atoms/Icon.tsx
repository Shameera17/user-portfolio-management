import React from "react";
import Image from "next/image";

export const Icon = ({ path }: { path: string }) => {
  return <Image src={path} width={20} height={20} alt="logo" />;
};
