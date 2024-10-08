import React from "react";
import { Password } from "../atoms/TextInput";
import Link from "next/link";
import { LinkText, P3 } from "../atoms/Typography";

interface InputGroupProps {
  placeholder: string;
  linkText: string;
  linkHref: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordGroup: React.FC<InputGroupProps> = ({
  placeholder,
  linkText,
  linkHref,
  value,
  onChange,
}) => {
  return (
    <div>
      {/* Input Field */}
      <Password value={value} onChange={onChange} placeholder={placeholder} />
      {/* Forgot Password Link */}

      <LinkText
        className="flex justify-end pt-2"
        text={linkText}
        linkHref={linkHref}
      />
    </div>
  );
};
