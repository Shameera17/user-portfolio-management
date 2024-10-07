import React from "react";
import { Input } from "@/components/ui/input";
interface InputProps {
  type?: string;
  placeholder?: string;
}
export function Email(props: InputProps) {
  return <Input type="email" placeholder={props.placeholder || "Email"} />;
}
export function Password(props: InputProps) {
  return (
    <Input type="password" placeholder={props.placeholder || "Password"} />
  );
}
