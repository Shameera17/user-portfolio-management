import React from "react";
import Image from "next/image";

export const Icon = ({
  path,
  onClick,
  dimention,
  type,
  className,
}: {
  path: string;
  onClick?: () => void;
  dimention?: number;
  type?: "icon" | "avatar";
  className?: string;
}) => {
  return (
    <Image
      className={`${type === "avatar" ? "rounded-full" : ""} ${className}`}
      style={{ cursor: onClick && "pointer" }}
      onClick={onClick}
      src={path}
      width={dimention ?? 20}
      height={dimention ?? 20}
      objectFit={"cover"}
      alt="logo"
    />
  );
};
