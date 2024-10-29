import React from "react";
import Image from "next/image";

export const Icon = ({
  path,
  onClick,
  dimention,
  type,
}: {
  path: string;
  onClick?: () => void;
  dimention?: number;
  type?: "icon" | "avatar";
}) => {
  return (
    <Image
      className={`${type === "avatar" ? "rounded-full" : ""}`}
      style={{ cursor: onClick && "pointer" }}
      onClick={onClick}
      src={path}
      width={dimention ?? 20}
      height={dimention ?? 20}
      alt="logo"
    />
  );
};
