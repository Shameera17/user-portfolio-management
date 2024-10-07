import React from "react";
import { Button } from "@/components/ui/button";
interface ButtonProps {
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
export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button className="w-full" type={props.type} variant={props.variant}>
      {props.label}
    </Button>
  );
};
