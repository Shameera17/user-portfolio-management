import React from "react";
import { Input } from "@/components/ui/input";

interface IInputProps {
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
export function Email(props: IInputProps) {
  return <Input type="email" placeholder={props.placeholder || "Email"} />;
}
export function Password(props: IInputProps) {
  return (
    <Input
      value={props.value}
      onChange={props.onChange}
      type="password"
      placeholder={props.placeholder || "Password"}
    />
  );
}
