import React from "react";
import { Button } from "@/components/ui/button";
interface IButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  label: string;
}
export const PrimaryButton = (props: IButtonProps) => {
  return (
    <Button
      className="w-full bg-[#6466E9] hover:bg-[#6466E9]"
      type={props.type}
      variant={props.variant}
    >
      {props.label}
    </Button>
  );
};
