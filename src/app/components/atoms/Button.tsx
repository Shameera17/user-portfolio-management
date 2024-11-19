import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import { P1 } from "./Typography";

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
  label?: string;
  onClick?: () => void;
  isLoading?: boolean;
  width?: string; // Add width prop
  iconPath?: string;
  fontColor?: string;
  disabled?: boolean;
  className?: string;
}
interface IconButtonProps extends IButtonProps {
  tooltipText?: string; // Optional tooltip text specific to IconButton
}

export const PrimaryButton = (props: IButtonProps) => {
  return (
    <Button
      disabled={props.isLoading}
      className={`bg-[#6466E9] hover:bg-[#6466E9] ${
        props.width ? props.width : "w-full"
      } ${props.className}`}
      type={props.type}
      variant={props.variant}
      onClick={props.onClick}
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

export const UploadButton = (props: IButtonProps) => {
  return (
    <Button
      disabled={props.isLoading || props.disabled}
      className={`bg-[#fff] hover:bg-[#fff] ${
        props.width ? props.width : "w-full"
      }`}
      type={props.type}
      variant={props.variant}
      onClick={props.onClick}
    >
      {props.iconPath && !props.isLoading && (
        <Avatar>
          <AvatarImage className="mr-2 h-5 w-5 " src={props.iconPath} />
        </Avatar>
      )}
      {props.isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      <P1 text={props.label!} fontColor={props.fontColor} />
    </Button>
  );
};
export const NavigateButton = (props: IButtonProps) => {
  return (
    <Button
      disabled={props.isLoading || props.disabled}
      className={` border-2 border-[#E3E8EF] `}
      type={props.type}
      variant={props.variant}
      onClick={props.onClick}
    >
      <P1 text={props.label!} fontColor={props.fontColor} />
      {props.iconPath && !props.isLoading && (
        <Avatar>
          <AvatarImage className="ml-2 h-5 w-5 " src={props.iconPath} />
        </Avatar>
      )}
    </Button>
  );
};
export const IconButton = (props: IconButtonProps) => {
  return (
    <div className="relative group">
      <Button
        disabled={props.isLoading || props.disabled}
        className="border-2 border-[#E3E8EF]"
        type={props.type}
        variant={props.variant}
        onClick={props.onClick}
      >
        {props.iconPath && !props.isLoading && (
          <Avatar>
            <AvatarImage className="h-5 w-5" src={props.iconPath} />
          </Avatar>
        )}
      </Button>

      {props.tooltipText && (
        <span className="absolute bottom-full mb-2 hidden w-max px-2 py-1 text-sm text-white bg-gray-700 rounded-md shadow-md group-hover:block">
          {props.tooltipText}
        </span>
      )}
    </div>
  );
};
