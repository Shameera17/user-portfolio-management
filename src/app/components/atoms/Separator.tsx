import React from "react";
import { Separator } from "@/components/ui/separator";

export const DividerWithText = ({ text }: { text: string }) => {
  return (
    <div className="relative flex items-center">
      <Separator className="w-full" />
      <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
        {text}
      </span>
    </div>
  );
};
