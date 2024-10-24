import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
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
  onClick?: () => void;
  isLoading?: boolean;
  width?: string; // Add width prop
  iconPath?: string;
}

export const PrimaryButton = (props: IButtonProps) => {
  return (
    <Button
      disabled={props.isLoading}
      className={`bg-[#6466E9] hover:bg-[#6466E9] ${
        props.width ? props.width : "w-full"
      }`}
      type={props.type}
      variant={props.variant}
    >
      {props.iconPath && !props.isLoading && (
        <Avatar>
          <AvatarImage className="mr-2 h-4 w-4 " src={props.iconPath} />
        </Avatar>
      )}
      {props.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.label}
    </Button>
  );
};

export const GithubButton = (props: IButtonProps) => {
  return (
    <Button
      className="w-full bg-[#20293A] hover:bg-[#4A5567] place-content-center gap-1"
      type={props.type}
      variant={props.variant}
      onClick={props.onClick}
    >
      <Avatar>
        {" "}
        <AvatarImage src="/images/github.svg" />
      </Avatar>{" "}
      {props.label}
    </Button>
  );
};
